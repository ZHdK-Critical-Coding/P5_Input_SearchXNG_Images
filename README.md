# SearXNG Image Search — p5.js

A text input and a search button. The query is sent to a SearXNG instance (`categories=images`). All result images are loaded and drawn as a pattern of 250×250 pixel tiles (center-cropped squares). The full JSON answer is logged to the console.

Ein Texteingabefeld und ein Such-Button. Die Suchanfrage wird an eine SearXNG-Instanz geschickt (`categories=images`). Alle Bilder werden geladen und als Muster aus 250×250 Pixel grossen Kacheln gezeichnet (quadratisch aus der Mitte zugeschnitten). Die ganze JSON-Antwort wird in der Konsole ausgegeben.

## Configuration

```js
const SEARCH_URL = "http://brian3.hermi.lan:8888/search?q=";
const TILE_SIZE = 250;
```

`&categories=images&format=json` is appended automatically. The JSON format must be enabled in SearXNG's `settings.yml`:

```yaml
search:
  formats:
    - html
    - json
```

## CORS

SearXNG does not send an `Access-Control-Allow-Origin` header. When the sketch runs in a browser (e.g. Live Server on `127.0.0.1:5500`), the request is blocked unless a reverse proxy in front of SearXNG adds the header, e.g. nginx:

```nginx
add_header Access-Control-Allow-Origin *;
```

Images are drawn on the canvas, so every image host must allow CORS as well. Images that fail to load are skipped (see console).
