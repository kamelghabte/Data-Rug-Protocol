// TITLE: LINZ KENTE [Danube Weather Weaving]
// CONTEXT: Ars Electronica Festival (Linz, Austria)
// DATA: REAL-TIME WEATHER (LINZ) + AUSTRIA OPEN DATA (CKAN) + BIODATA MIDI

// =====================
// WEATHER (OpenWeather)
// =====================
let apiKey = "YOUR_OPENWEATHER_KEY";
let city = "Linz,AT";
let weatherData = null;

let temp = 18;         // default: Linz temperate baseline
let humidity = 65;
let wind = 3;
let description = "LOADING DATA...";

// =====================
// AUSTRIA OPEN DATA (CKAN)
// =====================
// National portal
const CKAN_AT = "https://data.gv.at/katalog/api/3/action";
// City portal (Linz)
const CKAN_LINZ = "https://ckan.data.linz.gv.at/api/3/action";

let atCount = null;       // how many datasets match query on data.gv.at
let linzCount = null;     // how many datasets on Linz portal
let civicPulse = 0.0;     // 0..1 derived from counts
let civicStatus = "LOADING OPEN DATA...";

// Query strategy: keep it robust (no dependency on exact org-id)
const AT_QUERY = "linz";  // you can refine: "linz verkehr", "linz umwelt", etc.

// =====================
// WEAVING GRID
// =====================
let loomGrid = [];
let cols = 12;
let rows = 20;
let cellW, cellH;
let weaveCursor = 0;

// KENTE + LINZ ACCENTS
let kenteColors = ['#FCD116', '#006B3F', '#CE1126', '#000000', '#FFFFFF']; // classic Kente palette
let linzAccents = ['#00E5FF', '#7DF9FF', '#1E90FF']; // “Danube / AEC glow” accents (used sparingly)

// Margins
let margin = 80;
let bottomMargin = 170;

// =====================
// MIDI
// =====================
let midiAccess = null;
let lastActionTime = 0;

// Refresh timers (expo-friendly)
const WEATHER_REFRESH_MS = 10 * 60 * 1000;
const CIVIC_REFRESH_MS  = 15 * 60 * 1000;

// ---------------------
// SETUP
// ---------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  computeGrid();

  // init empty grid
  loomGrid = [];
  for (let i = 0; i < cols * rows; i++) {
    loomGrid.push({ type: 0, col: '#000', active: false });
  }

  // Weather
  refreshWeather();
  setInterval(refreshWeather, WEATHER_REFRESH_MS);

  // Austria Open Data (CKAN)
  refreshCivicData();
  setInterval(refreshCivicData, CIVIC_REFRESH_MS);

  // MIDI
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  }
}

function computeGrid() {
  let drawW = width - margin * 2;
  let drawH = height - margin - bottomMargin;
  cellW = drawW / cols;
  cellH = drawH / rows;
}

// ---------------------
// WEATHER
// ---------------------
function refreshWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  loadJSON(url, gotWeather, () => {
    description = "WEATHER API ERROR";
  });
}

function gotWeather(data) {
  weatherData = data;
  temp = data.main.temp;
  humidity = data.main.humidity;
  wind = data.wind.speed;
  description = (data.weather?.[0]?.description || "UNKNOWN").toUpperCase();
}

// ---------------------
// CKAN (OPEN DATA)
// ---------------------
function refreshCivicData() {
  civicStatus = "LOADING OPEN DATA...";

  // 1) Linz portal total datasets
  // CKAN Action API: package_search returns result.count even with rows=0
  // (CKAN Action API is documented here) : docs.ckan.org :contentReference[oaicite:5]{index=5}
  fetchJSON(`${CKAN_LINZ}/package_search?rows=0`, (json) => {
    linzCount = json?.result?.count ?? null;
    computeCivicPulse();
  }, () => {
    linzCount = null;
    computeCivicPulse();
  });

  // 2) National portal: datasets matching "linz"
  fetchJSON(`${CKAN_AT}/package_search?rows=0&q=${encodeURIComponent(AT_QUERY)}`, (json) => {
    atCount = json?.result?.count ?? null;
    computeCivicPulse();
  }, () => {
    atCount = null;
    computeCivicPulse();
  });
}

function fetchJSON(url, onOk, onErr) {
  fetch(url, { mode: "cors" })
    .then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then(onOk)
    .catch(() => onErr && onErr());
}

function computeCivicPulse() {
  // Build a stable pulse even if one API fails.
  // Normalize with log so it doesn't saturate too fast.
  let v1 = (typeof linzCount === "number") ? Math.log(linzCount + 1) : 0;
  let v2 = (typeof atCount === "number") ? Math.log(atCount + 1) : 0;

  // Tuned denominators (feel free to tweak)
  // Higher denominators => pulse grows slower.
  let p1 = constrain(v1 / Math.log(2000), 0, 1);
  let p2 = constrain(v2 / Math.log(20000), 0, 1);

  civicPulse = constrain((p1 * 0.65 + p2 * 0.35), 0, 1);

  if (linzCount === null && atCount === null) civicStatus = "OPEN DATA OFFLINE (FALLBACK MODE)";
  else civicStatus = "OPEN DATA LIVE";
}

// ---------------------
// MIDI
// ---------------------
function onMIDISuccess(midi) {
  midiAccess = midi;
  for (let input of midiAccess.inputs.values()) {
    input.onmidimessage = handleMIDIMessage;
  }
}
function onMIDIFailure() { /* silent */ }

function handleMIDIMessage(message) {
  const data = message.data;
  if (data[0] === 144 && data.length > 2 && data[2] > 0) {
    weavePattern(data[2]); // plant velocity
    lastActionTime = millis();
  }
}

// ---------------------
// DRAW LOOP
// ---------------------
function draw() {
  background(20);

  // AUTO-PILOT:
  // - Wind drives speed (Danube air / city conditions)
  // - Civic pulse accelerates slightly when the city "publishes more"
  let autoSpeed = map(wind, 0, 20, 1100, 220);
  autoSpeed *= map(civicPulse, 0, 1, 1.15, 0.75);

  if (millis() - lastActionTime > autoSpeed) {
    autoWeave();
    lastActionTime = millis();
  }

  // --- ART ZONE ---
  push();
  translate(margin, margin);

  // Draw grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let index = c + r * cols;
      let cell = loomGrid[index];

      let x = c * cellW;
      let y = r * cellH;

      if (cell.active) {
        drawKenteMotif(x, y, cellW, cellH, cell.type, cell.col);
      } else {
        // Background warp threads
        stroke(50);
        strokeWeight(1);
        line(x + cellW / 2, y, x + cellW / 2, y + cellH);
        noStroke();
      }
    }
  }

  // Shuttle (cursor)
  let cursorY = floor(weaveCursor / cols) * cellH;
  stroke('#FCD116');
  strokeWeight(2);
  line(0, cursorY + cellH, (width - margin * 2), cursorY + cellH);

  pop();

  // --- FRAME + UI ---
  drawMuseumFrame();
  drawLinzStats();

  if (mouseIsPressed) autoWeave();
}

// ---------------------
// WEAVING LOGIC (Weather + Civic + MIDI)
// ---------------------
function weavePattern(velocity) {
  let index = weaveCursor % (cols * rows);

  // 1) Motif complexity:
  // humidity -> baseline complexity
  // civicPulse -> pushes towards more structured motifs
  let baseComplexity = map(humidity, 0, 100, 1, 4);
  let civicBoost = map(civicPulse, 0, 1, 0, 1.5);
  let complexity = constrain(baseComplexity + civicBoost, 1, 4);

  // motif types (0..3)
  // civicPulse biases towards 2-3 (checker/triangle) when high
  let type;
  if (civicPulse > 0.7) type = floor(random(2, 4));
  else type = floor(random(0, complexity));

  // 2) Color selection:
  // Temperature drives warm/cool,
  // civicPulse occasionally injects "Danube/AEC glow" accents
  let col;

  if (temp > 22) {
    let warm = ['#FCD116', '#CE1126', '#000000', '#FCD116'];
    col = random(warm);
  } else if (temp < 10) {
    let cool = ['#006B3F', '#FFFFFF', '#000000', '#006B3F'];
    col = random(cool);
  } else {
    col = random(kenteColors);
  }

  // civic accent injection (rare, but strong identity cue)
  if (random() < (0.06 + civicPulse * 0.10)) {
    col = random(linzAccents);
  }

  // Plant velocity can force “black thread” (constraint / living veto)
  if (velocity > 100) col = '#000000';

  loomGrid[index].type = type;
  loomGrid[index].col = col;
  loomGrid[index].active = true;

  weaveCursor++;
}

function autoWeave() {
  // autopilot uses medium velocity
  weavePattern(random(55, 95));
}

// ---------------------
// MOTIFS
// ---------------------
function drawKenteMotif(x, y, w, h, type, col) {
  fill(col);
  noStroke();

  if (type === 0) {
    rect(x, y, w, h);
  } else if (type === 1) {
    // Stripes
    let stripes = 3;
    let sw = w / stripes;
    for (let i = 0; i < stripes; i += 2) rect(x + i * sw, y, sw, h);
  } else if (type === 2) {
    // Checker
    rect(x, y, w / 2, h / 2);
    rect(x + w / 2, y + h / 2, w / 2, h / 2);
  } else {
    // Triangle
    triangle(x, y + h, x + w / 2, y, x + w, y + h);
  }

  // Micro “weft noise” when civicPulse is high (subtle texture)
  if (civicPulse > 0.6 && random() < 0.35) {
    fill(0, 0, 0, 35);
    rect(x + w * 0.08, y + h * 0.08, w * 0.2, h * 0.12);
  }
}

// ---------------------
// UI
// ---------------------
function drawMuseumFrame() {
  fill(20);
  noStroke();
  rectMode(CORNER);

  rect(0, 0, width, margin);
  rect(0, height - bottomMargin, width, bottomMargin);
  rect(0, margin, margin, height - margin - bottomMargin);
  rect(width - margin, margin, margin, height - margin - bottomMargin);

  noFill();
  stroke(100);
  strokeWeight(1);
  rect(margin, margin, width - margin * 2, height - margin - bottomMargin);
}

function drawLinzStats() {
  let startX = margin;
  let startY = height - bottomMargin + 40;

  textFont('Courier New');
  textAlign(LEFT, TOP);
  noStroke();

  // Header
  fill(255);
  textSize(18);
  textStyle(BOLD);
  text("LINZ_KENTE // DANUBE_WEAVING", width / 2 - 170, startY);

  // Location + Festival anchor
  textSize(10);
  textStyle(NORMAL);
  fill(180);
  text("LOC: LINZ, AUSTRIA  |  CONTEXT: ARS ELECTRONICA (NEXT EDITION)", startX, startY);

  // Weather
  fill('#FCD116');
  text(`TEMP: ${nf(temp, 0, 1)}°C`, startX, startY + 16);
  text(`HUMIDITY: ${humidity}%`, startX, startY + 32);
  text(`WIND: ${nf(wind, 0, 1)} m/s`, startX + 160, startY + 16);
  text(`COND: ${description}`, startX + 160, startY + 32);

  // Open Data
  fill(150);
  text(`OPEN DATA: ${civicStatus}`, startX, startY + 54);

  fill(180);
  let linzTxt = (typeof linzCount === "number") ? linzCount : "--";
  let atTxt   = (typeof atCount === "number") ? atCount : "--";
  text(`LINZ PORTAL DATASETS: ${linzTxt}  |  AT PORTAL (q="${AT_QUERY}") COUNT: ${atTxt}`, startX, startY + 68);

  // Civic pulse bar
  let barW = 240;
  let barH = 8;
  let bx = startX;
  let by = startY + 88;

  noFill();
  stroke(120);
  rect(bx, by, barW, barH);

  noStroke();
  fill('#00E5FF');
  rect(bx, by, barW * civicPulse, barH);

  fill(150);
  textAlign(RIGHT, TOP);
  text("LIVE CITY + LIVING SYSTEM", width - margin, startY + 54);
  textAlign(LEFT, TOP);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  computeGrid();
}