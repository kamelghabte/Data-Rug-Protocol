// DATA RUG PROTOCOL // 01 CASABLANCA
// WHITE NOISE ATLANTIC — La Ville Blanche / Fréquence Atlantique
// Artiste : Kamel Ghabte
// Commission : Institut Français du Maroc (IFM)

// --------------------------------------------------
// 1) CONFIG API
// --------------------------------------------------
let apiKey = "2f05fef27241392f92f3b94a0d889ff0";
let city = "Casablanca,MA";
let weatherData = null;

let temp = 20;
let humidity = 75;
let wind = 7;
let description = "ATLANTIC SIGNAL...";

// --------------------------------------------------
// 2) MÉTIER À TISSER
// --------------------------------------------------
let loomGrid = [];
let cols = 12;
let rows = 14;
let cellW, cellH;
let weaveCursor = 0;
let lastActionTime = 0;
let pendingExport = false;

// --------------------------------------------------
// 3) PALETTE CASABLANCA
// Blanc minéral · Bleu océan · Gris · Noir · Cyan atlantique
// --------------------------------------------------
let palette = {
  blanc:   "#F5F5F0",
  ocean:   "#1B4F72",
  mineral: "#7F8C8D",
  noir:    "#0A0A0A",
  cyan:    "#00BFFF",
  gris:    "#2C3E50",
  sable:   "#BDC3C7"
};

let margin = 84;
let bottomMargin = 170;
let noiseLayer;

// --------------------------------------------------
// 4) SETUP
// --------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();

  initGrid();
  buildNoiseLayer();

  loadJSON(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    gotWeather,
    weatherError
  );
}

function initGrid() {
  let drawW = width - margin * 2;
  let drawH = height - margin - bottomMargin;
  cellW = drawW / cols;
  cellH = drawH / rows;

  loomGrid = [];
  for (let i = 0; i < cols * rows; i++) {
    loomGrid.push({
      type:   0,
      col:    palette.noir,
      accent: palette.cyan,
      rot:    0,
      active: false,
      energy: 0
    });
  }
}

// Grain sombre sur fond noir (bruit blanc atlantique)
function buildNoiseLayer() {
  noiseLayer = createGraphics(width, height);
  noiseLayer.clear();
  noiseLayer.noStroke();

  for (let i = 0; i < width * height * 0.0010; i++) {
    let x = random(width);
    let y = random(height);
    let a = random(6, 18);
    noiseLayer.fill(255, a);
    noiseLayer.circle(x, y, random(0.3, 1.2));
  }

  // Lignes horizontales spectrales (fréquence atlantique)
  for (let i = 0; i < 120; i++) {
    noiseLayer.stroke(255, 10);
    let y = random(height);
    noiseLayer.line(0, y, width, y + random(-1, 1));
  }
}

// --------------------------------------------------
// 5) MÉTÉO
// --------------------------------------------------
function gotWeather(data) {
  if (!data || !data.main || !data.weather || !data.wind) return;
  weatherData = data;
  temp        = data.main.temp;
  humidity    = data.main.humidity;
  wind        = data.wind.speed;
  description = data.weather[0].description.toUpperCase();
}

function weatherError(err) {
  console.log("Weather API error", err);
  description = "LOCAL MEMORY MODE";
}

// --------------------------------------------------
// 6) DRAW
// --------------------------------------------------
function draw() {
  background(palette.noir);
  image(noiseLayer, 0, 0);

  push();
  translate(margin, margin);
  drawGridThreads();
  drawCells();
  drawWeaveCursor();
  pop();

  drawMuseumFrame();
  drawHUD();

  // Export AVANT tout nouveau tissage
  if (pendingExport) {
    pendingExport = false;
    // Capture synchrone des pixels MAINTENANT, avant tout autre draw
    let cnv = document.querySelector('canvas');
    let dataURL = cnv.toDataURL('image/png');
    let ts = `${day()}-${month()}-${year()}_${nf(hour(),2)}h${nf(minute(),2)}`;
    let a = document.createElement('a');
    a.href = dataURL;
    a.download = `DATA_RUG_IFM_01_CASABLANCA_KAMEL_GHABTE_${ts}.png`;
    a.click();
    for (let c of loomGrid) c.active = false;
    weaveCursor = 0;
    lastActionTime = millis();
    return;
  }

  let autoSpeed = map(constrain(wind, 0, 20), 0, 20, 1000, 150);
  if (millis() - lastActionTime > autoSpeed) {
    autoWeave();
    lastActionTime = millis();
  }

  if (mouseIsPressed && frameCount % 4 === 0) {
    autoWeave();
  }
}

// --------------------------------------------------
// 7) TRAME / GRILLE
// --------------------------------------------------
function drawGridThreads() {
  // Fils de chaîne très fins, sombres
  stroke(255, 14);
  strokeWeight(0.5);
  for (let c = 0; c <= cols; c++) {
    let x = c * cellW;
    line(x, 0, x, rows * cellH);
  }
  for (let r = 0; r <= rows; r++) {
    let y = r * cellH;
    line(0, y, cols * cellW, y);
  }

  // Fils de trame blancs (chaîne warp)
  stroke(255, 45);
  for (let c = 0; c < cols; c++) {
    let x = c * cellW + cellW * 0.5;
    line(x, 0, x, rows * cellH);
  }
  noStroke();
}

function drawCells() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let index = c + r * cols;
      let cell  = loomGrid[index];
      let x     = c * cellW + cellW * 0.5;
      let y     = r * cellH + cellH * 0.5;

      let pulse  = sin(frameCount * 0.02 + index * 0.15) * 0.5 + 0.5;
      let energy = cell.energy * (0.75 + pulse * 0.25);

      if (cell.active) {
        drawCasaMotif(x, y, cellW * 0.88, cellH * 0.88, cell.type, cell.col, cell.accent, cell.rot, energy);
        cell.energy = lerp(cell.energy, 0.12, 0.05);
      } else {
        fill(255, 6);
        rect(x, y, cellW * 0.07, cellH * 0.07, 2);
      }
    }
  }
}

function drawWeaveCursor() {
  let cursorIndex = weaveCursor % (cols * rows);
  let cursorRow   = floor(cursorIndex / cols);
  let cursorCol   = cursorIndex % cols;

  let y = cursorRow * cellH + cellH * 0.5;
  let x = cursorCol * cellW + cellW * 0.5;

  // Ligne navette
  stroke(palette.cyan);
  strokeWeight(1.4);
  line(0, y, cols * cellW, y);

  // Marqueur cellule active
  noFill();
  stroke(palette.blanc);
  strokeWeight(0.8);
  rect(x, y, cellW * 0.88, cellH * 0.88);
  noStroke();
}

// --------------------------------------------------
// 8) LOGIQUE DE COULEUR
// --------------------------------------------------
function pickColor() {
  // Froid atlantique
  if (temp <= 16) {
    return random([palette.ocean, palette.mineral, palette.gris]);
  }
  // Chaleur estivale
  if (temp >= 28) {
    return random([palette.blanc, palette.sable, palette.cyan]);
  }
  // Tempéré : mélange palette complète
  return random([palette.blanc, palette.ocean, palette.mineral, palette.cyan]);
}

function pickAccent(baseCol) {
  if (baseCol === palette.blanc || baseCol === palette.sable) return palette.ocean;
  if (baseCol === palette.ocean) return palette.cyan;
  return palette.blanc;
}

// --------------------------------------------------
// 9) TISSAGE
// --------------------------------------------------
function weavePattern(velocity) {
  let index = weaveCursor % (cols * rows);

  // humidity → plafond de complexité (0..3)
  let complexity = floor(map(constrain(humidity, 30, 100), 30, 100, 1, 4));
  // vent fort → favorise motifs directionnels (ondes, art déco)
  let pool = wind > 9 ? [1, 2, 1, 2, 0] : Array.from({length: complexity + 1}, (_, i) => i);
  let motif = random(pool);

  loomGrid[index].type   = motif;
  loomGrid[index].col    = pickColor();
  loomGrid[index].accent = pickAccent(loomGrid[index].col);
  loomGrid[index].rot    = floor(random(4)) * HALF_PI;
  loomGrid[index].active = true;
  loomGrid[index].energy = map(constrain(velocity, 1, 127), 1, 127, 0.35, 1);

  // Dernier motif posé → flag export (saveCanvas tiré après drawHUD dans draw)
  if (index === cols * rows - 1) {
    pendingExport = true;
  }

  weaveCursor++;
}

function autoWeave() {
  let ghostVelocity = map(constrain(wind + humidity * 0.04, 0, 14), 0, 14, 34, 92);
  weavePattern(ghostVelocity);
}

// --------------------------------------------------
// 10) MOTIFS CASABLANCA
// Même structure que Le 18 : formes pleines, 3 couches max
// --------------------------------------------------
function drawCasaMotif(x, y, w, h, type, col, accent, rot, energy) {
  push();
  translate(x, y);
  rotate(rot);
  rectMode(CENTER);
  noStroke();

  let breath = 1 + sin(frameCount * 0.03 + x * 0.01 + y * 0.01) * 0.02 * energy;
  scale(breath);

  if (type === 0) {
    // Carré plein + carré intérieur + noyau
    fill(col);
    rect(0, 0, w * 0.86, h * 0.86);
    fill(accent);
    rect(0, 0, w * 0.44, h * 0.44);
    fill(col);
    rect(0, 0, w * 0.14, h * 0.14);

  } else if (type === 1) {
    // Arche — même structure que Le 18
    fill(col);
    beginShape();
    vertex(-w * 0.38, h * 0.42);
    vertex(-w * 0.38, -h * 0.02);
    bezierVertex(-w * 0.38, -h * 0.36, w * 0.38, -h * 0.36, w * 0.38, -h * 0.02);
    vertex(w * 0.38, h * 0.42);
    endShape(CLOSE);
    fill(accent);
    rect(0, h * 0.12, w * 0.5, h * 0.12);
    fill(palette.blanc);
    rect(0, h * 0.2, w * 0.14, h * 0.14, 10);

  } else if (type === 2) {
    // Losange plein + losange intérieur + accent
    fill(col);
    beginShape();
    vertex(0, -h * 0.43);
    vertex(w * 0.43, 0);
    vertex(0, h * 0.43);
    vertex(-w * 0.43, 0);
    endShape(CLOSE);
    fill(accent);
    beginShape();
    vertex(0, -h * 0.21);
    vertex(w * 0.21, 0);
    vertex(0, h * 0.21);
    vertex(-w * 0.21, 0);
    endShape(CLOSE);
    fill(palette.cyan);
    beginShape();
    vertex(0, -h * 0.06);
    vertex(w * 0.06, 0);
    vertex(0, h * 0.06);
    vertex(-w * 0.06, 0);
    endShape(CLOSE);

  } else {
    // Cercle + bandes horizontales intérieures
    fill(col);
    ellipse(0, 0, w * 0.84, h * 0.84);
    fill(accent);
    rect(0, -h * 0.13, w * 0.46, h * 0.14, 999);
    rect(0, h * 0.13, w * 0.46, h * 0.14, 999);
    fill(palette.blanc);
    ellipse(0, 0, w * 0.16, h * 0.16);
  }

  pop();
}

// --------------------------------------------------
// 11) CADRE MUSÉE
// --------------------------------------------------
function drawMuseumFrame() {
  rectMode(CORNER);

  // Bandes noires opaques sur les 4 côtés
  fill(palette.noir);
  noStroke();
  rect(0,              0,               width,  margin);
  rect(0,              height - bottomMargin, width, bottomMargin);
  rect(0,              margin,          margin, height - margin - bottomMargin);
  rect(width - margin, margin,          margin, height - margin - bottomMargin);

  // Bordure fine bleu océan
  noFill();
  stroke(palette.ocean);
  strokeWeight(1);
  rect(margin, margin, width - margin * 2, height - margin - bottomMargin);

  // Ligne séparatrice HUD — cyan
  stroke(palette.cyan);
  strokeWeight(2);
  line(margin, height - bottomMargin, width - margin, height - bottomMargin);

  noStroke();
}

// --------------------------------------------------
// 12) HUD
// --------------------------------------------------
function drawHUD() {
  let ty = height - bottomMargin + 38;

  let yr  = year();
  let mo  = nf(month(), 2);
  let d   = nf(day(), 2);
  let h   = nf(hour(), 2);
  let mi  = nf(minute(), 2);
  let s   = nf(second(), 2);

  textFont("Helvetica");
  textStyle(NORMAL);

  // ---- GAUCHE : localisation + data ----
  textAlign(LEFT, TOP);
  fill(140);
  textSize(10);
  text("CASABLANCA, MAROC // INSTITUT FRANÇAIS DU MAROC", margin, ty);

  fill(palette.cyan);
  textSize(11);
  text(`SYS.TIME ${yr}-${mo}-${d} [${h}:${mi}:${s}]`, margin, ty + 28);

  fill(160);
  textSize(10);
  text(
    `33.5731N / 7.5898W  //  TEMP ${nf(temp, 1, 1)}°C  HUM ${humidity}%  WIND ${nf(wind, 1, 1)} m/s`,
    margin, ty + 56
  );

  fill(120);
  text(`CONDITION : ${description}`, margin, ty + 82);

  // ---- CENTRE : titre + légende ----
  textAlign(CENTER, TOP);
  fill(palette.blanc);
  textSize(16);
  text("DATA RUG PROTOCOL // 01 CASABLANCA", width * 0.5, ty);

  fill(palette.cyan);
  textSize(9);
  text("WHITE NOISE ATLANTIC  —  La Ville Blanche / Fréquence Atlantique", width * 0.5, ty + 28);

  fill(120);
  textSize(9);
  text("KAMEL GHABTE  //  DATA ART  //  CREATIVE CODING  //  IFM 2026", width * 0.5, ty + 44);

  // Légende chromatique
  let legendY = ty + 68;
  let sw = 110;
  let sx = width * 0.5 - sw * 1.5;

  rectMode(CORNER);
  fill(palette.ocean);
  rect(sx, legendY, 10, 10);
  fill(130);
  textAlign(LEFT, TOP);
  textSize(9);
  text("≤ 16°C  ATLANTIQUE", sx + 14, legendY);

  fill(palette.mineral);
  rect(sx + sw, legendY, 10, 10);
  fill(130);
  text("17–27°C  MINÉRAL", sx + sw + 14, legendY);

  fill(palette.cyan);
  rect(sx + sw * 2, legendY, 10, 10);
  fill(130);
  text("≥ 28°C  BLANC SOLAIRE", sx + sw * 2 + 14, legendY);

  // Légende morphologique
  let morphY = legendY + 22;
  let motifNames = ["0·PORTAIL", "1·ARCADE", "2·DAMIER", "3·FLUX"];
  let mstep = 88;
  let mx = width * 0.5 - (mstep * 1.5);
  textAlign(LEFT, TOP);
  textSize(9);
  for (let i = 0; i < motifNames.length; i++) {
    fill(100);
    rect(mx + i * mstep, morphY, 8, 8);
    fill(130);
    text(motifNames[i], mx + i * mstep + 12, morphY);
  }

  // ---- DROITE : système ----
  textAlign(RIGHT, TOP);
  fill(palette.blanc);
  textSize(11);
  text("ALGORITHME ACTIF", width - margin, ty);

  fill(160);
  textSize(10);
  text(`CONDITION MÉTÉO : ${description}`, width - margin, ty + 28);

  let currentLine = floor((weaveCursor % (cols * rows)) / cols) + 1;
  text(`PHASE : ${currentLine} / ${rows}`, width - margin, ty + 56);
  text(`CELLULES : ${weaveCursor % (cols * rows)} / ${cols * rows}`, width - margin, ty + 82);
}

// --------------------------------------------------
// 13) RESIZE
// --------------------------------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initGrid();
  buildNoiseLayer();
}
