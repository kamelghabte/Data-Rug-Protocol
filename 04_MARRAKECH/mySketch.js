// DATA RUG PROTOCOL // 04 MARRAKECH
// OCHRE HEAT PULSE — Ville Ocre / Chaleur Rituelle
// Artiste : Kamel Ghabte
// Commission : Institut Français du Maroc (IFM)

// --------------------------------------------------
// 1) CONFIG API
// --------------------------------------------------
let apiKey = "2f05fef27241392f92f3b94a0d889ff0";
let city = "Marrakech,MA";
let weatherData = null;

let temp = 30;
let humidity = 28;
let wind = 4;
let description = "OCHRE PULSE...";

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
// 3) PALETTE MARRAKECH
// Ocre · Majorelle · Or · Ombre · Blanc
// --------------------------------------------------
let palette = {
  ocre:      "#D35400",
  rouge:     "#C0392B",
  majorelle: "#1A2463",
  or:        "#F39C12",
  ombre:     "#2C1810",
  blanc:     "#FDFEFE",
  noir:      "#0A0A0A",
  terre:     "#8B4513"
};

let margin = 84;
let bottomMargin = 170;
let textureLayer;

// --------------------------------------------------
// 4) SETUP
// --------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();

  initGrid();
  buildTextureLayer();

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
      accent: palette.or,
      rot:    0,
      active: false,
      energy: 0
    });
  }
}

function buildTextureLayer() {
  textureLayer = createGraphics(width, height);
  textureLayer.clear();
  textureLayer.noStroke();

  for (let i = 0; i < width * height * 0.0010; i++) {
    let x = random(width);
    let y = random(height);
    let a = random(5, 16);
    textureLayer.fill(211, 84, 0, a);
    textureLayer.circle(x, y, random(0.3, 1.1));
  }

  for (let i = 0; i < 90; i++) {
    textureLayer.stroke(211, 84, 0, 5);
    let y = random(height);
    textureLayer.line(0, y, width, y + random(-1, 1));
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
  image(textureLayer, 0, 0);

  push();
  translate(margin, margin);
  drawGridThreads();
  drawCells();
  drawWeaveCursor();
  pop();

  drawMuseumFrame();
  drawHUD();

  if (pendingExport) {
    pendingExport = false;
    noLoop();
    let ts = `${day()}-${month()}-${year()}_${nf(hour(),2)}h${nf(minute(),2)}`;
    saveCanvas(`DATA_RUG_IFM_04_MARRAKECH_KAMEL_GHABTE_${ts}`, 'png');
    setTimeout(() => {
      for (let c of loomGrid) c.active = false;
      weaveCursor = 0;
      lastActionTime = millis();
      loop();
    }, 200);
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
  stroke(211, 84, 0, 16);
  strokeWeight(0.5);
  for (let c = 0; c <= cols; c++) {
    let x = c * cellW;
    line(x, 0, x, rows * cellH);
  }
  for (let r = 0; r <= rows; r++) {
    let y = r * cellH;
    line(0, y, cols * cellW, y);
  }

  stroke(255, 30);
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

      let pulse  = sin(frameCount * 0.025 + index * 0.12) * 0.5 + 0.5;
      let energy = cell.energy * (0.75 + pulse * 0.25);

      if (cell.active) {
        drawMarrakechMotif(x, y, cellW * 0.86, cellH * 0.86, cell.type, cell.col, cell.accent, cell.rot, energy);
        cell.energy = lerp(cell.energy, 0.12, 0.05);
      } else {
        fill(211, 84, 0, 6);
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

  stroke(palette.or);
  strokeWeight(1.4);
  line(0, y, cols * cellW, y);

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
  if (temp >= 35) {
    return random([palette.ocre, palette.rouge, palette.or]);
  }
  if (temp <= 20) {
    return random([palette.majorelle, palette.ombre, palette.terre]);
  }
  return random([palette.ocre, palette.majorelle, palette.or, palette.rouge]);
}

function pickAccent(baseCol) {
  if (baseCol === palette.majorelle) return palette.or;
  if (baseCol === palette.ocre || baseCol === palette.rouge) return palette.majorelle;
  return palette.blanc;
}

// --------------------------------------------------
// 9) TISSAGE
// --------------------------------------------------
function weavePattern(velocity) {
  let index = weaveCursor % (cols * rows);

  // Dernier motif posé → flag export
  if (index === cols * rows - 1) {
    pendingExport = true;
  }

  let complexity = floor(map(constrain(humidity, 20, 90), 20, 90, 1, 4));
  let pool = Array.from({length: complexity + 1}, (_, i) => i);
  let motif = random(pool);

  loomGrid[index].type   = motif;
  loomGrid[index].col    = pickColor();
  loomGrid[index].accent = pickAccent(loomGrid[index].col);
  loomGrid[index].rot    = floor(random(4)) * HALF_PI;
  loomGrid[index].active = true;
  loomGrid[index].energy = map(constrain(velocity, 1, 127), 1, 127, 0.35, 1);

  weaveCursor++;
}

function autoWeave() {
  let ghostVelocity = map(constrain(wind + humidity * 0.03, 0, 12), 0, 12, 34, 92);
  weavePattern(ghostVelocity);
}

// --------------------------------------------------
// 10) MOTIFS MARRAKECH
// Chaleur et geometrie ocre : formes pleines, 3 couches max
// --------------------------------------------------
function drawMarrakechMotif(x, y, w, h, type, col, accent, rot, energy) {
  push();
  translate(x, y);
  rotate(rot);
  rectMode(CENTER);
  noStroke();
  let breath = 1 + sin(frameCount * 0.03 + x * 0.01 + y * 0.01) * 0.02 * energy;
  scale(breath);
  if (type === 0) {
    // KOUTOUBIA -- rectangle etroit + triangle sommet
    fill(col);
    rect(0, h * 0.08, w * 0.38, h * 0.68);
    fill(accent);
    beginShape();
    vertex(0, -h * 0.44);
    vertex(w * 0.22, -h * 0.16);
    vertex(-w * 0.22, -h * 0.16);
    endShape(CLOSE);
    fill(col);
    rect(0, -h * 0.16, w * 0.44, h * 0.08);
  } else if (type === 1) {
    // SOLEIL JEMAA -- cercle irradiant, double halo
    fill(col);
    ellipse(0, 0, w * 0.86, h * 0.86);
    fill(accent);
    ellipse(0, 0, w * 0.54, h * 0.54);
    fill(palette.majorelle);
    ellipse(0, 0, w * 0.22, h * 0.22);
  } else if (type === 2) {
    // REMPART -- double carre epais, muraille
    fill(col);
    rect(0, 0, w * 0.86, h * 0.86);
    fill(accent);
    rect(0, 0, w * 0.62, h * 0.62);
    fill(col);
    rect(0, 0, w * 0.36, h * 0.36);
  } else {
    // ARC MAJORELLE -- arc plein + base, porte de riad
    fill(col);
    rect(0, h * 0.16, w * 0.68, h * 0.52);
    fill(col);
    ellipse(0, -h * 0.1, w * 0.68, h * 0.56);
    fill(accent);
    rect(0, h * 0.16, w * 0.36, h * 0.36);
    fill(palette.majorelle);
    ellipse(0, -h * 0.1, w * 0.36, h * 0.28);
  }
  pop();
}

// --------------------------------------------------
// 11) CADRE MUSÉE
// --------------------------------------------------
function drawMuseumFrame() {
  rectMode(CORNER);

  fill(palette.noir);
  noStroke();
  rect(0,              0,               width,  margin);
  rect(0,              height - bottomMargin, width, bottomMargin);
  rect(0,              margin,          margin, height - margin - bottomMargin);
  rect(width - margin, margin,          margin, height - margin - bottomMargin);

  noFill();
  stroke(palette.ocre);
  strokeWeight(1);
  rect(margin, margin, width - margin * 2, height - margin - bottomMargin);

  stroke(palette.or);
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

  // ---- GAUCHE ----
  textAlign(LEFT, TOP);
  fill(140);
  textSize(10);
  text("MARRAKECH, MAROC // INSTITUT FRANÇAIS DU MAROC", margin, ty);

  fill(palette.or);
  textSize(11);
  text(`SYS.TIME ${yr}-${mo}-${d} [${h}:${mi}:${s}]`, margin, ty + 28);

  fill(160);
  textSize(10);
  text(
    `31.6295N / 7.9811W  //  TEMP ${nf(temp, 1, 1)}°C  HUM ${humidity}%  WIND ${nf(wind, 1, 1)} m/s`,
    margin, ty + 56
  );

  fill(120);
  text(`CONDITION : ${description}`, margin, ty + 82);

  // ---- CENTRE ----
  textAlign(CENTER, TOP);
  fill(palette.blanc);
  textSize(16);
  text("DATA RUG PROTOCOL // 04 MARRAKECH", width * 0.5, ty);

  fill(palette.or);
  textSize(9);
  text("OCHRE HEAT PULSE  —  Ville Ocre / Chaleur Rituelle", width * 0.5, ty + 28);

  fill(120);
  textSize(9);
  text("KAMEL GHABTE  //  DATA ART  //  CREATIVE CODING  //  IFM 2026", width * 0.5, ty + 44);

  // Légende chromatique
  let legendY = ty + 68;
  let sw = 110;
  let sx = width * 0.5 - sw * 1.5;

  rectMode(CORNER);
  fill(palette.majorelle);
  rect(sx, legendY, 10, 10);
  fill(130);
  textAlign(LEFT, TOP);
  textSize(9);
  text("≤ 20°C  MAJORELLE", sx + 14, legendY);

  fill(palette.ocre);
  rect(sx + sw, legendY, 10, 10);
  fill(130);
  text("21–34°C  OCRE", sx + sw + 14, legendY);

  fill(palette.rouge);
  rect(sx + sw * 2, legendY, 10, 10);
  fill(130);
  text("≥ 35°C  FEU SOLAIRE", sx + sw * 2 + 14, legendY);

  // Légende morphologique
  let morphY = legendY + 22;
  let motifNames = ["0·REMPART", "1·KOUTOUBIA", "2·JEMAA", "3·SOLEIL"];
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

  // ---- DROITE ----
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
  buildTextureLayer();
}
