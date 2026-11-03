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
