// TITRE : DATA RUG PROTOCOL // LA MAMOUNIA EDITION (DAYLIGHT)
// COLLECTION : AFRIC'ARTECH
// CONTEXTE CURATORIAL : 1-54 CONTEMP. AFRICAN ART FAIR (@154artfair)
// CIBLE : LA MAMOUNIA (Marrakech, Maroc) - Fond Blanc / Riad

// =====================================================
// API SETUP
// =====================================================
let apiKey = "YOUR_OPENWEATHER_KEY";   // <-- remets ta clé ici
let city = "Marrakesh,MA";
let weatherData = null;

let temp = 32;
let humidity = 30;
let wind = 3;
let description = "CONNEXION À MARRAKECH...";

// =====================================================
// IDENTITÉ 1-54 / EXPOSITION
// =====================================================
let fair = {
  short: "1-54",
  name: "CONTEMP. AFRICAN ART FAIR",
  handle: "@154artfair",
  venue: "LA MAMOUNIA // MARRAKECH",
  edition: "SPECIAL DISPLAY // DAYLIGHT RIAD",
  collection: "AFRIC'ARTECH"
};

// =====================================================
// GRILLE DE TISSAGE
// =====================================================
let loomGrid = [];
let cols = 10;
let rows = 12;
let cellW, cellH;
let weaveCursor = 0;
let lastActionTime = 0;

// =====================================================
// PALETTE LA MAMOUNIA (DAYLIGHT)
// =====================================================
let colors = {
  terracotta: '#A63C24',  // Rouge brique
  emerald:    '#1B4D3E',  // Vert profond
  gold:       '#C5A059',  // Or mat
  majorelle:  '#1A2463',  // Bleu Majorelle
  canvas:     '#FBF9F6',  // Blanc cassé
  textDark:   '#2C3531',  // Gris très foncé
  softLine:   '#E7E1D8',  // Ligne beige claire
  inkSoft:    '#7B7B7B'
};

// UI marges
let margin = 80;
let bottomMargin = 160;

// =====================================================
// SETUP
// =====================================================
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont('Courier New');

  if (apiKey && apiKey !== "YOUR_OPENWEATHER_KEY") {
    loadJSON(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      gotWeather,
      gotWeatherError
    );
  } else {
    description = "MODE LOCAL // API NON RENSEIGNÉE";
  }

  computeGrid();

  for (let i = 0; i < cols * rows; i++) {
    loomGrid.push({ type: 0, col: colors.canvas, active: false });
  }

  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMIDISuccess, (e) => console.log("No MIDI", e));
  }
}

// =====================================================
// WEATHER
// =====================================================
function gotWeather(data) {
  weatherData = data;
  temp = data.main.temp;
  humidity = data.main.humidity;
  wind = data.wind.speed;
  description = data.weather[0].description.toUpperCase();
}

function gotWeatherError(err) {
  console.log("Weather API error:", err);
  description = "MODE LOCAL // MÉTÉO INDISPONIBLE";
}

// =====================================================
// MIDI
// =====================================================
function onMIDISuccess(midi) {
  for (let input of midi.inputs.values()) {
    input.onmidimessage = (msg) => {
      if (msg.data[0] === 144 && msg.data[2] > 0) {
        weavePattern(msg.data[2]);
        lastActionTime = millis();
      }
    };
  }
}

// =====================================================
// DRAW
// =====================================================
function draw() {
  background(colors.canvas);

  // AUTO-PILOT
  let autoSpeed = map(wind, 0, 15, 800, 150);
  if (millis() - lastActionTime > autoSpeed) {
    autoWeave();
    lastActionTime = millis();
  }

  push();
  translate(margin, margin);

  let gridW = cols * cellW;
  let gridH = rows * cellH;

  // Watermark géant 1-54 derrière le tissage
  draw154Watermark(gridW, gridH);

  // Trame verticale / horizontale
  stroke(colors.softLine);
  strokeWeight(1);

  for (let c = 0; c < cols; c++) {
    let x = c * cellW + cellW / 2;
    line(x, 0, x, gridH);
  }

  for (let r = 0; r < rows; r++) {
    let y = r * cellH + cellH / 2;
    line(0, y, gridW, y);
  }

  // Accents de rythme 1-54
  draw154Rhythm(gridW, gridH);

  noStroke();

  // Grille et motifs
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let index = c + r * cols;
      let cell = loomGrid[index];

      let x = c * cellW + cellW / 2;
      let y = r * cellH + cellH / 2;

      if (cell.active) {
        drawMamouniaMotif(x, y, cellW * 0.85, cellH * 0.85, cell.type, cell.col);

        // Balises spéciales "54"
        if (index % 54 === 0) {
          draw154Marker(x, y);
        }
      }
    }
  }

  // Navette / ligne active
  let cursorY = floor((weaveCursor % (cols * rows)) / cols) * cellH;
  stroke(colors.terracotta);
  strokeWeight(2);
  line(0, cursorY + cellH, gridW, cursorY + cellH);

  pop();

  drawMuseumFrame();
  drawFairIdentity();
  drawHUD();
  drawCollectorCartel();

  if (mouseIsPressed && frameCount % 5 === 0) autoWeave();
}

// =====================================================
// TISSAGE
// =====================================================
function weavePattern(velocity) {
  let index = weaveCursor % (cols * rows);
  let type = weaveCursor % 3;

  let col;
  if (temp >= 35) {
    col = random([colors.terracotta, colors.gold]);
  } else if (temp < 20) {
    col = random([colors.majorelle, colors.emerald]);
  } else {
    col = random([colors.emerald, colors.gold, colors.terracotta]);
  }

  loomGrid[index].type = type;
  loomGrid[index].col = col;
  loomGrid[index].active = true;

  weaveCursor++;
}

function autoWeave() {
  weavePattern(80);
}

// =====================================================
// MOTIFS
// =====================================================
function drawMamouniaMotif(x, y, w, h, type, col) {
  push();
  translate(x, y);
  rectMode(CENTER);
  noStroke();

  if (type === 0) {
    // Étoile 8 branches
    fill(col);
    rect(0, 0, w * 0.65, w * 0.65);
    rotate(PI / 4);
    rect(0, 0, w * 0.65, w * 0.65);

    fill(colors.canvas);
    ellipse(0, 0, w * 0.3, w * 0.3);
    fill(colors.gold);
    ellipse(0, 0, w * 0.15, w * 0.15);

  } else if (type === 1) {
    // Arcade mauresque
    fill(col);
    rect(0, h / 6, w * 0.8, h * 0.66);
    arc(0, -h / 6, w * 0.8, h * 0.6, PI, 0);

    fill(colors.canvas);
    arc(0, h / 3, w * 0.5, h * 0.8, PI, 0);

    fill(colors.gold);
    rect(0, -h / 10, w * 0.05, h * 0.3);
    ellipse(0, h / 10, w * 0.15, w * 0.15);

  } else {
    // Bassin / losange jardin
    fill(col);
    quad(0, -h / 2, w / 2, 0, 0, h / 2, -w / 2, 0);

    fill(colors.gold);
    triangle(-w / 2, -h / 4, -w / 3, 0, -w / 2, h / 4);
    triangle(w / 2, -h / 4, w / 3, 0, w / 2, h / 4);

    fill(col === colors.emerald ? colors.majorelle : colors.emerald);
    rect(0, 0, w * 0.25, w * 0.25);
  }

  pop();
}

// =====================================================
// LAYER 1-54
// =====================================================
function draw154Watermark(gridW, gridH) {
  push();
  noStroke();
  fill(withAlpha(colors.gold, 24));
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  textStyle(BOLD);

  let huge = min(gridW, gridH) * 0.30;
  textSize(huge);
  text("1", gridW * 0.20, gridH * 0.32);
  text("54", gridW * 0.73, gridH * 0.63);

  stroke(withAlpha(colors.gold, 35));
  strokeWeight(1);
  line(gridW * 0.08, gridH * 0.18, gridW * 0.36, gridH * 0.18);
  line(gridW * 0.58, gridH * 0.78, gridW * 0.92, gridH * 0.78);
  pop();
}

function draw154Rhythm(gridW, gridH) {
  push();
  stroke(withAlpha(colors.gold, 55));
  strokeWeight(1);

  // 1 / 5 / 4 en lecture rythmique
  let c1 = 0;
  let c5 = 4;
  let c4 = 8;

  let x1 = c1 * cellW + cellW / 2;
  let x5 = c5 * cellW + cellW / 2;
  let x4 = min(c4, cols - 1) * cellW + cellW / 2;

  line(x1, 0, x1, gridH);
  line(x5, 0, x5, gridH);
  line(x4, 0, x4, gridH);

  // légère pulsation horizontale
  let pulseY = map(sin(frameCount * 0.02), -1, 1, gridH * 0.15, gridH * 0.85);
  stroke(withAlpha(colors.terracotta, 30));
  line(0, pulseY, gridW, pulseY);
  pop();
}

function draw154Marker(x, y) {
  push();
  translate(x, y);
  noFill();
  stroke(withAlpha(colors.gold, 140));
  strokeWeight(1.2);
  ellipse(0, 0, cellW * 0.88, cellH * 0.88);
  line(-cellW * 0.20, 0, cellW * 0.20, 0);
  line(0, -cellH * 0.20, 0, cellH * 0.20);
  pop();
}

// =====================================================
// HABILLAGE / FRAME
// =====================================================
function drawMuseumFrame() {
  fill(colors.canvas);
  noStroke();
  rectMode(CORNER);

  rect(0, 0, width, margin);
  rect(0, height - bottomMargin, width, bottomMargin);
  rect(0, margin, margin, height - margin - bottomMargin);
  rect(width - margin, margin, margin, height - margin - bottomMargin); // corrigé

  noFill();
  stroke(colors.gold);
  strokeWeight(1);
  rect(margin, margin, width - margin * 2, height - margin - bottomMargin);
}

function drawFairIdentity() {
  let topY = margin * 0.43;

  // Gauche
  textAlign(LEFT, CENTER);
  textFont('Georgia');
  textStyle(BOLD);
  textSize(30);
  fill(colors.textDark);
  text(fair.short, margin, topY);

  textFont('Courier New');
  textStyle(NORMAL);
  textSize(11);
  fill(colors.inkSoft);
  text(fair.name, margin + 88, topY - 7);

  fill(colors.terracotta);
  text(fair.handle, margin + 88, topY + 9);

  // Droite
  textAlign(RIGHT, CENTER);
  fill(colors.inkSoft);
  text(`${fair.collection} // ${fair.edition}`, width - margin, topY - 7);

  fill(colors.gold);
  text(fair.venue, width - margin, topY + 9);

  // Ruban vertical discret
  push();
  translate(width - margin * 0.26, height / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  textFont('Courier New');
  textSize(10);
  fill(withAlpha(colors.textDark, 120));
  text("1-54 // LIVE CLIMATE WEAVING // DATA RUG PROTOCOL", 0, 0);
  pop();
}

function drawCollectorCartel() {
  let boxW = 315;
  let boxH = 76;
  let x = width - margin - boxW;
  let y = height - bottomMargin + 62;

  fill(251, 249, 246, 245);
  stroke(colors.gold);
  strokeWeight(1);
  rect(x, y, boxW, boxH);

  noStroke();
  textAlign(LEFT, TOP);

  textFont('Georgia');
  textStyle(BOLD);
  textSize(13);
  fill(colors.textDark);
  text("1-54 / DATA RUG PROTOCOL", x + 14, y + 11);

  textFont('Courier New');
  textStyle(NORMAL);
  textSize(10);
  fill(colors.inkSoft);
  text("LA MAMOUNIA EDITION // AFRIC'ARTECH", x + 14, y + 34);
  text("LIVE WEATHER + MIDI + ZELLIGE LOGIC", x + 14, y + 49);
}

// =====================================================
// HUD
// =====================================================
function drawHUD() {
  let ty = height - bottomMargin + 40;

  let y = year();
  let mo = nf(month(), 2);
  let d = nf(day(), 2);
  let h = nf(hour(), 2);
  let m = nf(minute(), 2);
  let s = nf(second(), 2);

  // 1. GAUCHE
  textAlign(LEFT, TOP);
  textFont('Courier New');

  textSize(11);
  textStyle(NORMAL);
  fill(100);
  text(`FAIR: ${fair.short} ${fair.name}`, margin, ty);

  fill(colors.terracotta);
  textStyle(BOLD);
  text(`SYS.TIME: ${y}-${mo}-${d} [${h}:${m}:${s}]`, margin, ty + 18);

  fill(80);
  textStyle(NORMAL);
  text(`OASIS DATA: TEMP ${nf(temp, 1, 1)}°C | HUMIDITY ${humidity}% | WIND ${wind}m/s`, margin, ty + 36);

  // 2. CENTRE
  textAlign(CENTER, TOP);

  textFont('Georgia');
  textSize(22);
  textStyle(BOLD);
  fill(colors.textDark);
  text("DATA RUG PROTOCOL // LA MAMOUNIA EDITION", width / 2, ty);

  textFont('Courier New');
  textSize(10);
  textStyle(NORMAL);
  fill(120);
  let legY = ty + 30;
  text("LÉGENDE CHROMATIQUE // MÉTÉO // FOIRE", width / 2, legY);

  let swatchW = 100;
  let startX = width / 2 - (swatchW * 1.55);

  rectMode(CORNER);

  fill(colors.terracotta);
  rect(startX, legY + 15, 10, 10);
  fill(100);
  textAlign(LEFT, TOP);
  text("> 35°C", startX + 15, legY + 14);

  fill(colors.emerald);
  rect(startX + swatchW, legY + 15, 10, 10);
  fill(100);
  text("20-35°C", startX + swatchW + 15, legY + 14);

  fill(colors.majorelle);
  rect(startX + swatchW * 2.0, legY + 15, 10, 10);
  fill(100);
  text("< 20°C", startX + swatchW * 2.0 + 15, legY + 14);

  fill(colors.gold);
  rect(startX + swatchW * 2.9, legY + 15, 10, 10);
  fill(100);
  text("1-54 SIGNAL", startX + swatchW * 2.9 + 15, legY + 14);

  // 3. DROITE
  textAlign(RIGHT, TOP);
  fill(100);
  let currentLine = floor((weaveCursor % (cols * rows)) / cols);
  text(`ALGORITHMIC ZELLIGE ACTIF`, width - margin, ty);
  text(`LIGNE EN COURS: ${currentLine + 1}/${rows}`, width - margin, ty + 15);
  text(`INDEX 54 MARKERS: ${floor((cols * rows) / 54) + 1}`, width - margin, ty + 30);
}

// =====================================================
// HELPERS
// =====================================================
function computeGrid() {
  let drawW = width - margin * 2;
  let drawH = height - margin - bottomMargin;
  cellW = drawW / cols;
  cellH = drawH / rows;
}

function withAlpha(hex, alpha) {
  let c = color(hex);
  c.setAlpha(alpha);
  return c;
}

// =====================================================
// RESIZE
// =====================================================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  computeGrid();
}