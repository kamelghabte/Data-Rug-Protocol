// =============================================================
// DATA RUG PROTOCOL — 01 CASABLANCA
// WHITE NOISE ATLANTIC — La Ville Blanche / Fréquence Atlantique
// Artiste : Kamel Ghabte
// Commission : Institut Français du Maroc (IFM)
// Data : OpenWeather API — Casablanca, MA
// =============================================================

// --- API ---
let apiKey = "YOUR_OPENWEATHER_KEY";
let city   = "Casablanca,MA";

// --- MÉTÉO (valeurs par défaut offline) ---
let temp        = 20;
let humidity    = 75;
let wind        = 7;
let description = "ATLANTIC SIGNAL...";
let apiStatus   = "CONNECTING...";

// --- PALETTE CASABLANCA ---
// Blanc minéral, bleu océan, gris, noir, accent cyan
const PAL = {
  blanc:    '#F5F5F0',
  ocean:    '#1B4F72',
  mineral:  '#7F8C8D',
  noir:     '#0A0A0A',
  cyan:     '#00BFFF',
  gris_fon: '#1C1C1C',
  bordure:  '#2E86C1',
};

// --- GRILLE ---
// Casablanca : grille dense, flux atlantique
// humidity → complexité → cols/rows entre 18 et 28
let cols = 20;
let rows = 26;
let cellW, cellH;

let loomGrid  = [];
let weaveCursor = 0;
let lastActionTime = 0;

// --- MARGES ---
const margin       = 70;
const bottomMargin = 190;

// --- MIDI ---
let midiReady = false;

// =============================================================
// SETUP
// =============================================================
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont('Courier New');

  computeGrid();
  initLoom();
  fetchWeather();

  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(
      (midi) => {
        midiReady = true;
        for (let input of midi.inputs.values()) {
          input.onmidimessage = onMIDI;
        }
      },
      () => { midiReady = false; }
    );
  }

  // Refresh météo toutes les 10 min
  setInterval(fetchWeather, 10 * 60 * 1000);
}

// =============================================================
// MÉTÉO
// =============================================================
function fetchWeather() {
  if (!apiKey || apiKey === "YOUR_OPENWEATHER_KEY") {
    apiStatus = "OFFLINE — MODE LOCAL";
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  loadJSON(url, gotWeather, () => {
    apiStatus = "API ERROR — FALLBACK DATA";
  });
}

function gotWeather(data) {
  temp        = data.main.temp;
  humidity    = data.main.humidity;
  wind        = data.wind.speed;
  description = (data.weather[0].description).toUpperCase();
  apiStatus   = "LIVE";
}

// =============================================================
// MIDI
// =============================================================
function onMIDI(msg) {
  // Note ON (status 144), velocity > 0
  if (msg.data[0] === 144 && msg.data[2] > 0) {
    weavePattern(msg.data[2]);
    lastActionTime = millis();
  }
}

// =============================================================
// GRILLE
// =============================================================
function computeGrid() {
  let drawW = width  - margin * 2;
  let drawH = height - margin - bottomMargin;
  cellW = drawW / cols;
  cellH = drawH / rows;
}

function initLoom() {
  loomGrid = [];
  for (let i = 0; i < cols * rows; i++) {
    loomGrid.push({ type: 0, col: PAL.noir, active: false });
  }
}

// =============================================================
// TISSAGE
// =============================================================
function weavePattern(velocity) {
  let total = cols * rows;
  let index = weaveCursor % total;

  // Export PNG + reset à chaque cycle complet
  if (index === 0 && weaveCursor > 0) {
    let ts = `${day()}-${month()}-${year()}_${nf(hour(),2)}h${nf(minute(),2)}`;
    saveCanvas(`DATA_RUG_IFM_01_CASABLANCA_KAMEL_GHABTE_${ts}`, 'png');
    for (let c of loomGrid) c.active = false;
  }

  // --- TYPE DE MOTIF ---
  // humidity → complexité (0..5 types disponibles)
  // + vent côtier influence la direction
  let complexity = floor(map(humidity, 30, 100, 1, 5));
  let type;
  if (wind > 8) {
    // vent fort : motifs directionnels (ondes, bandes)
    type = floor(random(1, 3));
  } else {
    type = floor(random(0, complexity + 1));
    type = constrain(type, 0, 5);
  }

  // --- COULEUR ---
  // temp → choix dans la palette atlantique de Casablanca
  let col;
  if (temp >= 28) {
    // Chaleur : minéral chaud, blanc, cyan
    col = random([PAL.blanc, PAL.mineral, PAL.cyan, PAL.blanc]);
  } else if (temp <= 16) {
    // Froid atlantique : bleu océan profond, gris
    col = random([PAL.ocean, PAL.mineral, PAL.gris_fon, PAL.ocean]);
  } else {
    // Tempéré : mélange complet palette Casablanca
    col = random([PAL.blanc, PAL.ocean, PAL.mineral, PAL.cyan]);
  }

  // Velocity forte → accent blanc pur (bruit/flash)
  if (velocity > 100) col = PAL.blanc;

  loomGrid[index].type   = type;
  loomGrid[index].col    = col;
  loomGrid[index].active = true;
  weaveCursor++;
}

function autoWeave() {
  weavePattern(floor(random(55, 95)));
}

// =============================================================
// MOTIFS CASABLANCA
// Art déco, ondes atlantiques, grille dense, fréquences blanches
// =============================================================
function drawCasaMotif(x, y, w, h, type, col) {
  fill(col);
  noStroke();

  if (type === 0) {
    // SOLID — cellule pleine (béton blanc)
    rect(x, y, w, h);

  } else if (type === 1) {
    // ONDE HORIZONTALE — fréquence atlantique
    // 3 bandes horizontales alternées
    let bh = h / 4;
    rect(x,          y,          w, bh);
    rect(x,          y + bh * 2, w, bh);

  } else if (type === 2) {
    // ART DÉCO — bandes verticales fines (façades Casablanca)
    let bw = w / 5;
    rect(x,          y, bw, h);
    rect(x + bw * 2, y, bw, h);
    rect(x + bw * 4, y, bw, h);

  } else if (type === 3) {
    // CHECKER — zellige minimaliste blanc/gris
    rect(x,       y,       w/2, h/2);
    rect(x + w/2, y + h/2, w/2, h/2);
    // accent mineral sur les cases inverses
    fill(PAL.mineral);
    rect(x + w/2, y,       w/2, h/2);
    rect(x,       y + h/2, w/2, h/2);
    fill(col);

  } else if (type === 4) {
    // CROIX ART DÉCO — portail habous
    rect(x + w * 0.35, y,           w * 0.3, h);
    rect(x,            y + h * 0.35, w,      h * 0.3);

  } else {
    // DIAGONALE ATLANTIQUE — signal, onde basse fréquence
    triangle(x,     y,     x + w, y,     x,     y + h);
    fill(PAL.ocean);
    triangle(x + w, y + h, x,     y + h, x + w, y);
    fill(col);
  }

  // Micro-accent cyan sur vent fort (bruit de signal)
  if (wind > 9 && random() < 0.18) {
    fill(PAL.cyan);
    rect(x + w * 0.1, y + h * 0.1, w * 0.15, h * 0.12);
  }
}

// =============================================================
// DRAW
// =============================================================
function draw() {
  background(PAL.noir);

  // AUTO-PILOT : vent → vitesse (fort vent côtier = tissage rapide)
  let autoSpeed = map(wind, 0, 20, 1200, 180);
  if (millis() - lastActionTime > autoSpeed) {
    autoWeave();
    lastActionTime = millis();
  }

  // --- ZONE ART ---
  push();
  translate(margin, margin);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let idx  = c + r * cols;
      let cell = loomGrid[idx];
      let x    = c * cellW;
      let y    = r * cellH;

      if (cell.active) {
        drawCasaMotif(x, y, cellW, cellH, cell.type, cell.col);
      } else {
        // Fils de chaîne : lignes verticales très fines
        stroke(35);
        strokeWeight(0.5);
        line(x + cellW / 2, y, x + cellW / 2, y + cellH);
        noStroke();
      }
    }
  }

  // Navette (curseur de tissage) — cyan Atlantique
  let navY = floor((weaveCursor % (cols * rows)) / cols) * cellH;
  stroke(PAL.cyan);
  strokeWeight(1.5);
  line(0, navY + cellH, cols * cellW, navY + cellH);
  noStroke();

  pop();

  drawMuseumFrame();
  drawHUD();

  // Clic souris = tissage manuel
  if (mouseIsPressed && frameCount % 4 === 0) {
    autoWeave();
    lastActionTime = millis();
  }
}

// =============================================================
// FRAME MUSÉE
// =============================================================
function drawMuseumFrame() {
  fill(PAL.noir);
  noStroke();
  rectMode(CORNER);

  // Bandes opaques 4 côtés
  rect(0,              0,               width,  margin);
  rect(0,              height - bottomMargin, width, bottomMargin);
  rect(0,              margin,          margin, height - margin - bottomMargin);
  rect(width - margin, margin,          margin, height - margin - bottomMargin);

  // Bordure fine couleur océan
  noFill();
  stroke(PAL.bordure);
  strokeWeight(1);
  rect(margin, margin, width - margin * 2, height - margin - bottomMargin);
  noStroke();
}

// =============================================================
// HUD
// =============================================================
function drawHUD() {
  let bx = margin;
  let by = height - bottomMargin + 22;

  // ---- COLONNE GAUCHE : identité + météo ----
  textAlign(LEFT, TOP);

  // Titre
  fill(PAL.blanc);
  textSize(17);
  textStyle(BOLD);
  text("DATA RUG PROTOCOL  //  01 CASABLANCA", bx, by);

  textSize(10);
  textStyle(NORMAL);
  fill(PAL.cyan);
  text("WHITE NOISE ATLANTIC  —  La Ville Blanche / Fréquence Atlantique", bx, by + 22);

  // Artiste
  fill(PAL.mineral);
  textSize(10);
  text("ARTISTE : KAMEL GHABTE  |  IFM — INSTITUT FRANÇAIS DU MAROC", bx, by + 38);

  // Date/heure
  fill(PAL.blanc);
  textSize(10);
  let ts = `${day()}/${month()}/${year()}  ${nf(hour(),2)}:${nf(minute(),2)}:${nf(second(),2)}`;
  text(`DATE : ${ts}`, bx, by + 55);

  // Météo
  fill(PAL.cyan);
  textSize(10);
  text(`TEMP : ${nf(temp,1,1)}°C   |   HUMIDITY : ${humidity}%   |   WIND : ${nf(wind,1,1)} m/s`, bx, by + 72);
  fill(PAL.mineral);
  text(`CONDITION : ${description}`, bx, by + 87);

  // Status API
  fill(apiStatus === "LIVE" ? '#2ECC71' : '#E74C3C');
  text(`● API : ${apiStatus}`, bx, by + 103);

  // MIDI
  fill(midiReady ? '#2ECC71' : PAL.mineral);
  text(`● MIDI : ${midiReady ? "CONNECTÉ" : "NON DÉTECTÉ"}`, bx + 160, by + 103);

  // ---- COLONNE CENTRE : légendes ----
  let cx = width / 2;
  textAlign(CENTER, TOP);

  fill(PAL.mineral);
  textSize(9);
  text("LÉGENDE CHROMATIQUE — TEMPÉRATURE", cx, by + 2);

  // Swatches couleurs
  let sw = 80;
  let sx = cx - sw * 1.5;
  let sy = by + 16;
  rectMode(CORNER);

  // Froid
  fill(PAL.ocean);
  rect(sx, sy, 10, 10);
  fill(PAL.mineral);
  textAlign(LEFT, TOP);
  textSize(9);
  text("≤ 16°C  ATLANTIQUE", sx + 14, sy);

  // Tempéré
  fill(PAL.blanc);
  rect(sx + sw, sy, 10, 10);
  fill(PAL.mineral);
  text("17–27°C  BLANC MINÉRAL", sx + sw + 14, sy);

  // Chaud
  fill(PAL.cyan);
  rect(sx + sw * 2.3, sy, 10, 10);
  fill(PAL.mineral);
  text("≥ 28°C  CYAN SOLAIRE", sx + sw * 2.3 + 14, sy);

  // Légende morphologique
  textAlign(CENTER, TOP);
  fill(PAL.mineral);
  textSize(9);
  text("LÉGENDE MORPHOLOGIQUE — MOTIFS", cx, by + 44);

  let mx   = cx - 220;
  let my   = by + 57;
  let mstep = 88;
  let motifs = ["0.SOLID", "1.ONDE", "2.ART DÉCO", "3.CHECKER", "4.CROIX", "5.SIGNAL"];
  textAlign(LEFT, TOP);
  for (let i = 0; i < motifs.length; i++) {
    fill(PAL.mineral);
    textSize(8);
    text(motifs[i], mx + i * mstep, my);
    // mini preview du motif
    drawCasaMotif(mx + i * mstep, my + 11, 14, 14, i, PAL.blanc);
  }

  // ---- COLONNE DROITE : système ----
  textAlign(RIGHT, TOP);

  fill(PAL.mineral);
  textSize(9);
  text("ALGORITHME ACTIF", width - margin, by + 2);

  fill(PAL.blanc);
  textSize(10);
  let currentRow = floor((weaveCursor % (cols * rows)) / cols) + 1;
  text(`LIGNE : ${currentRow} / ${rows}`, width - margin, by + 18);
  text(`CELLULES : ${weaveCursor % (cols * rows)} / ${cols * rows}`, width - margin, by + 33);
  text(`CYCLES : ${floor(weaveCursor / (cols * rows))}`, width - margin, by + 48);

  fill(PAL.mineral);
  textSize(9);
  text(`GRILLE : ${cols} × ${rows}`, width - margin, by + 68);
  text(`VENT VITESSE AUTO-PILOT`, width - margin, by + 82);
  text(`CASABLANCA  33.5731N / 7.5898W`, width - margin, by + 97);
}

// =============================================================
// RESIZE
// =============================================================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  computeGrid();
}
