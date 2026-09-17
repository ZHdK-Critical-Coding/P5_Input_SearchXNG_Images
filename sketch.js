// ===============================
// SearXNG Image Search in p5.js
// ===============================

// -------------------------------
// Search endpoint (query is appended)
// -------------------------------
const SEARCH_URL = "http://brian3.hermi.lan:8888/search?q=";
const TILE_SIZE = 250;  // size of each image in the pattern
const TOP = 60;         // space for the input field

let input;        // text input field
let button;       // search button
let images = [];  // loaded p5.Image objects
let status = "";  // info text (loading, errors)
let searchId = 0; // ignores images from an older search

// -------------------------------
// p5.js setup function
// -------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);

  input = createInput("");
  input.position(20, 20);
  input.size(300);

  button = createButton("Search");
  button.position(340, 20);
  button.mousePressed(search);
}

// -------------------------------
// p5.js draw function
// -------------------------------
function draw() {
  background(255);
  noStroke();
  fill(0);
  textSize(14);
  text(status, 420, 36);

  // Number of tiles per row
  const columns = max(1, floor(width / TILE_SIZE));

  // Draw the images as a pattern of square tiles
  images.forEach((img, i) => {
    const x = (i % columns) * TILE_SIZE;
    const y = TOP + floor(i / columns) * TILE_SIZE;

    // Crop the center of the image to a square
    const side = min(img.width, img.height);
    const sx = (img.width - side) / 2;
    const sy = (img.height - side) / 2;
    image(img, x, y, TILE_SIZE, TILE_SIZE, sx, sy, side, side);
  });
}

// -------------------------------
// Enter key also starts the search
// -------------------------------
function keyPressed() {
  if (keyCode === ENTER) {
    search();
  }
}

// -------------------------------
// Fetch image results from SearXNG (JSON)
// -------------------------------
async function search() {
  const query = input.value().trim();
  if (query === "") return;

  status = "Searching...";
  images = [];
  searchId++;
  const currentSearch = searchId;

  try {
    const response = await fetch(SEARCH_URL + encodeURIComponent(query) + "&categories=images&format=json");
    const json = await response.json();

    console.log(json);

    status = json.results.length + " images for \"" + query + "\"";

    // Load every image; use the thumbnail if there is one (smaller, faster)
    json.results.forEach(result => {
      const src = result.thumbnail_src || result.img_src;
      if (!src) return;

      loadImage(
        src,
        img => {
          if (currentSearch !== searchId) return;
          images.push(img);
          resizeToFit();
        },
        () => console.log("Could not load image: " + src)
      );
    });
  } catch (error) {
    console.error(error);
    status = "Error: " + error.message;
  }
}

// -------------------------------
// Make the canvas tall enough for all tiles (page scrolls)
// -------------------------------
function resizeToFit() {
  const columns = max(1, floor(windowWidth / TILE_SIZE));
  const rows = ceil(images.length / columns);
  resizeCanvas(windowWidth, max(windowHeight, TOP + rows * TILE_SIZE));
}

function windowResized() {
  resizeToFit();
}
