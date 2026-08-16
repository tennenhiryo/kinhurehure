# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

"Liquid Glass" — a single-page, no-build flashcard trainer for memorizing numbered English sentences/phrases (currently a TOEIC-style vocabulary list), with a Japanese-language UI. There is no backend, no package manager, and no build step: it's four static files served as-is.

- `index.html` — markup for the four screens (setup, game, pause modal, results), all toggled via CSS classes rather than routing.
- `style.css` — "glass" (frosted, blurred, dark) visual theme; all state-driven appearance is controlled by class toggles (`.active`, `.is-flipped`, `.coming-up`, etc.) rather than inline styles, except for transform/transition values set directly by `script.js` during drag/animation.
- `data.js` — defines `window.rawData`, a backtick template string of `NNN sentence text` lines. This is the content data source (edit this to change the deck).
- `script.js` — parses `window.rawData` into `sentenceList` and implements all game logic and gesture handling.

## Running / developing

There is no build, bundle, lint, or test tooling in this repo (no `package.json`). To develop:

- Open `index.html` directly in a browser, or serve the directory with any static file server (e.g. `python3 -m http.server`) — a local server avoids any `file://` restrictions on script loading.
- There are no automated tests. Verify changes manually in-browser (desktop pointer + mobile/touch behavior, since the app uses Pointer Events to unify mouse and touch).
- Cache-busting: `index.html` references `style.css?v=9.2` and `script.js?v=9.2`. **Bump this version query string whenever `style.css` or `script.js` changes**, since the app has no build hash and browsers/mobile home-screen shortcuts aggressively cache these assets. Keep the `<title>` and the `.version` footer text in `index.html` in sync with the version bump.

## Data format (`data.js`)

`window.rawData` is a single backtick string with one entry per line: `<number><whitespace><sentence>`. The parser regex in `script.js` is `^(\d+)[.\s\t　]+(.+)$` (note it accepts a literal `.` or full-width space `　` as a separator too). Numbers do not need to be zero-padded or contiguous — the game range is whatever `[min, max]` the user enters on the setup screen, and any number in that range without a matching entry falls back to displaying `"No Data"`.

## Architecture / state flow

All state lives in module-level `let` variables in `script.js` (`numbers`, `leftSwiped`, `currentIndex`, `isDragging`, `isAnimating`) — there is no framework, no component tree, and no reactive state; every state change is followed by an explicit imperative DOM update.

1. **Setup → Game**: `startGame()` reads `min-val`/`max-val`, builds a shuffled `numbers` array (`sort(() => Math.random() - 0.5)`), then calls `updateView()`.
2. **Card rendering**: `updateView()` sets the front/back text of `#card` from `sentenceList`, resets its transform/transition (so the next card doesn't inherit the previous swipe animation), and pre-positions the upcoming card (`#next-card`) behind it for the stacked-deck effect.
3. **Input handling is unified across mouse/touch/keyboard** into one gesture model:
   - Pointer Events (`pointerdown`/`pointermove`/`pointerup`/`pointercancel`) drive `handleStart`/`handleMove`/`handleEnd`, which distinguish a tap (< 10px movement → flip via `.is-flipped`) from a swipe (> 80px movement → `swipeCard()`), with anything in between snapping back.
   - Keyboard: Enter/Space flips the card; ArrowLeft/ArrowRight trigger `swipeCard('left'|'right')`.
   - A card swiped left is recorded as "unknown" into `leftSwiped`; swiping right (or advancing without a left-swipe) counts as "known". This known/unknown distinction is the only scoring signal.
4. **`isAnimating` is a manual lock** — swipe/keyboard handlers bail out early while a 300ms swipe animation is in flight, and `updateView()`/handlers also check whether the pause modal is `.active` to suppress input. When modifying animation timing, keep the `setTimeout` durations in `script.js` (300ms swipe, 400ms next-card transition, 600ms flip) in sync with the corresponding CSS `transition` durations in `style.css`, or the lock will release before (or after) the visual animation actually finishes.
5. **Results**: `showResults()` computes `knownCount`/`percent` from `numbers`, `currentIndex`, and `leftSwiped`, then renders a `.item-known`/`.item-unknown` list. Ending early via the pause modal's "終了して結果を見る" button scores only the cards actually played (`currentIndex`), not the full deck.

## Conventions

- UI copy and code comments are in Japanese; keep new user-facing strings and comments consistent with that.
- No CSS/JS framework, no modules/bundler — new code should stay in plain global-scope functions in `script.js` and plain selectors in `style.css`, consistent with the rest of the file.
- Element lookups (`document.getElementById`) are done ad hoc at call time throughout `script.js` rather than cached, except for `card`/`nextCard` which are cached once at the top — follow the existing pattern rather than introducing a new caching layer.
