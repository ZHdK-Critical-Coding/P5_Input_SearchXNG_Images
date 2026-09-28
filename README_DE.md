# P5.js: SearXNG Images

[English](README.md)

Ein Texteingabefeld und ein Such-Button. Die Suchanfrage wird an eine
SearXNG-Instanz geschickt (`categories=images`). Alle Bilder werden geladen
und als Muster aus 250 × 250 Pixel grossen Kacheln gezeichnet (quadratisch
aus der Mitte zugeschnitten). Ein Ausgangspunkt, um Collagen oder
Moodboards aus Bildsuch-Resultaten zu bauen.

## Installation

Voraussetzungen: eine laufende [SearXNG](https://docs.searxng.org)-Instanz,
die vom eigenen Computer aus erreichbar ist, mit aktiviertem JSON-Format und
CORS-Headern (siehe unten).

1. `SEARCH_URL` oben in `sketch.js` auf die eigene Instanz setzen:
   ```js
   const SEARCH_URL = "http://brian3.hermi.lan:8888/search?q=";
   const TILE_SIZE = 250;
   ```
2. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
3. Einen Suchbegriff eingeben und auf **Search** klicken oder Enter drücken.

### SearXNG-Konfiguration

`&categories=images&format=json` wird automatisch angehängt. Das
JSON-Format muss in der `settings.yml` von SearXNG aktiviert sein:

```yaml
search:
  formats:
    - html
    - json
```

SearXNG schickt keinen `Access-Control-Allow-Origin`-Header. Läuft der
Sketch im Browser (z. B. Live Server auf `127.0.0.1:5500`), wird die Anfrage
blockiert, ausser ein Reverse Proxy vor SearXNG ergänzt den Header, z. B.
nginx:

```nginx
add_header Access-Control-Allow-Origin *;
```

Die Bilder werden auf die Zeichenfläche gezeichnet, deshalb muss auch jeder
Bild-Host CORS erlauben. Bilder, die nicht geladen werden können, werden
übersprungen (siehe Konsole).

Bibliotheken (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (eingebunden,
nicht verwendet).

## Coding-Hilfe

- **Konfiguration oben in `sketch.js`**: `SEARCH_URL` (Such-Endpunkt, die
  kodierte Suchanfrage wird angehängt), `TILE_SIZE` (Kachelgrösse in Pixel)
  und `TOP` (Platz für das Eingabefeld).
- **`setup()`**: erstellt eine fensterfüllende Zeichenfläche, das
  Texteingabefeld und den Knopf **Search**.
- **`keyPressed()`**: Enter startet ebenfalls `search()`.
- **`search()`**: ruft die Bildresultate ab, gibt das ganze JSON in der
  Konsole aus und lädt jedes Bild mit `loadImage()` – das Thumbnail
  (`thumbnail_src`), falls vorhanden, sonst `img_src`. Geladene Bilder
  kommen in `images`; `searchId` sorgt dafür, dass Bilder einer älteren
  Suche ignoriert werden.
- **`draw()`**: zeichnet `images` als Raster und schneidet jedes Bild
  quadratisch aus der Mitte zu. Das Layout hier ändern (z. B. zufällige
  Positionen oder Grössen).
- **`resizeToFit()`**: macht die Zeichenfläche hoch genug für alle Kacheln,
  damit die Seite scrollt. Wird auch von `windowResized()` aufgerufen.
