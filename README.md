# P5.js: SearXNG Images

[Deutsch](README_DE.md)

A text input and a search button. The query is sent to a SearXNG instance
(`categories=images`). All result images are loaded and drawn as a pattern
of 250 × 250 pixel tiles (center-cropped squares). A starting point for
building collages or moodboards from web image search results.

## Installation

Requirements: a running [SearXNG](https://docs.searxng.org) instance that
is reachable from your computer, with the JSON format enabled and CORS
headers added (see below).

1. Set `SEARCH_URL` at the top of `sketch.js` to your instance:
   ```js
   const SEARCH_URL = "http://brian3.hermi.lan:8888/search?q=";
   const TILE_SIZE = 250;
   ```
2. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
3. Type a query and click **Search** or press Enter.

### SearXNG configuration

`&categories=images&format=json` is appended automatically. The JSON format
must be enabled in SearXNG's `settings.yml`:

```yaml
search:
  formats:
    - html
    - json
```

SearXNG does not send an `Access-Control-Allow-Origin` header. When the
sketch runs in a browser (e.g. Live Server on `127.0.0.1:5500`), the request
is blocked unless a reverse proxy in front of SearXNG adds the header, e.g.
nginx:

```nginx
add_header Access-Control-Allow-Origin *;
```

Images are drawn on the canvas, so every image host must allow CORS as
well. Images that fail to load are skipped (see console).

Libraries (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (included, not
used).

## Coding Help

- **Config at the top of `sketch.js`**: `SEARCH_URL` (search endpoint, the
  encoded query is appended), `TILE_SIZE` (tile size in pixels) and `TOP`
  (space for the input field).
- **`setup()`**: creates a full-window canvas, the text input and the
  **Search** button.
- **`keyPressed()`**: Enter also starts `search()`.
- **`search()`**: fetches the image results, logs the full JSON to the
  console and loads every image with `loadImage()` – the thumbnail
  (`thumbnail_src`) if there is one, else `img_src`. Loaded images are added
  to `images`; `searchId` makes sure images from an older search are
  ignored.
- **`draw()`**: draws `images` as a grid, cropping each one to a square from
  its center. Change the layout here (e.g. random positions or sizes).
- **`resizeToFit()`**: makes the canvas tall enough for all tiles, so the
  page scrolls. Also called from `windowResized()`.
