# cert-cards

Minimal flashcard decks for IT certifications, served as a static GitHub Pages site. Public sources only; summaries are written in my own words and link to the exact source section.

Decks: Security+ (SY0-701) in progress, then AWS Solutions Architect Associate, then CCNA.

## Controls
- Tap right half: next card. Tap left half: previous card.
- Hold: show the back (summary + source link), release to return. To open the source, hold, slide onto the link, and release.
- Top circle: switch deck.
- Desktop: arrow keys to move, hold Space to flip.

## Adding a deck
Add an entry to `decks/index.json` and a JSON array of cards:
`{ "id", "obj", "front", "back", "src": { "title", "url" } }`
Use `#:~:text=` text fragments in `url` to land on the exact paragraph.

Run locally with `python3 -m http.server` (fetch needs http, not file://).

## Checking sources
`python3 tools/check_links.py` confirms every card's source loads and still contains the quoted passage (`src.q`). PDF sources link to `#page=N`; the check needs `pdftotext`.

## Security+ Domain 1 gaps (no verified public source yet)
Deterrent and directive control types, gap analysis, access control vestibule/bollards/fencing/lighting, adaptive identity, backout plan, maintenance window, SOPs, downtime/restarts, legacy apps, dependencies, version control.
