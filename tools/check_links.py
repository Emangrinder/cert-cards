#!/usr/bin/env python3
"""Check every card's source link: the page loads and still contains the quoted passage.

Usage: python3 tools/check_links.py [decks/security-plus.json ...]
HTML sources: the url's #:~:text= fragment must appear in the page text.
PDF sources:  src.q must appear on the page named by #page=N (needs pdftotext).
"""
import html, json, re, subprocess, sys, tempfile, urllib.parse, urllib.request

UA = {"User-Agent": "Mozilla/5.0"}
_cache = {}


def norm(s):
    s = s.replace("’", "'").replace("‘", "'").replace("“", '"').replace("”", '"')
    return re.sub(r"\s+", " ", s).strip().lower()


def fetch(url):
    if url not in _cache:
        _cache[url] = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read()
    return _cache[url]


def html_text(url):
    h = fetch(url).decode("utf8", "ignore")
    h = re.sub(r"(?s)<(script|style)[^>]*>.*?</\1>", "", h)
    return html.unescape(re.sub(r"<[^>]+>", " ", h))


def pdf_page_text(url, page):
    with tempfile.NamedTemporaryFile(suffix=".pdf") as f:
        f.write(fetch(url))
        f.flush()
        return subprocess.run(["pdftotext", "-f", str(page), "-l", str(page), "-layout", f.name, "-"],
                              capture_output=True, text=True).stdout


def check(card):
    url, q = card["src"]["url"], card["src"].get("q", "")
    base, _, frag = url.partition("#")
    if frag.startswith("page="):
        hay = pdf_page_text(base, int(frag[5:]))
    else:
        hay = html_text(base)
        if ":~:text=" in frag:
            q = urllib.parse.unquote(frag.split(":~:text=", 1)[1])
    if not q:
        return "no quote to verify"
    return None if norm(q) in norm(hay) else "quote not found on page"


def main(paths):
    bad = 0
    for p in paths:
        for c in json.load(open(p)):
            try:
                err = check(c)
            except Exception as e:  # network, bad pdf, etc.
                err = repr(e)
            if err:
                bad += 1
                print(f"FAIL {c['id']}: {err}  {c['src']['url']}")
    print("all links ok" if not bad else f"{bad} failing")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:] or ["decks/security-plus.json"]))
