// DATA RUG PROTOCOL // 12 EL JADIDA
// MAZAGAN CISTERN PATTERN — Mazagan / Citerne Atlantique
// Artiste : Kamel Ghabte
// Commission : Institut Français du Maroc (IFM)

// --------------------------------------------------
// 1) CONFIG API
// --------------------------------------------------
let apiKey = "2f05fef27241392f92f3b94a0d889ff0";
let city = "El Jadida,MA";
let weatherData = null;

let temp = 20;
let humidity = 76;
let wind = 6;
let description = "MAZAGAN SIGNAL...";

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
// 3) PALETTE EL JADIDA
// Bleu citerne · Vert-de-gris · Gris pierre · Blanc reflet · Nuit
// --------------------------------------------------
let palette = {
  citerne:  "#1F4E79",
  verdegris:"#5D7B6F",
  pierre:   "#BDC3C7",
  blanc:    "#FDFEFE",
  nuit:     "#0A0A0A",
  reflet:   "#7FB3D3",
  bastion:  "#2C3E50"
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
      col:    palette.nuit,
      accent: palette.reflet,
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

  for (let i = 0; i < width * height * 0.0009; i++) {
    let x = random(width);
    let y = random(height);
    let a = random(4, 12);
    textureLayer.fill(31, 78, 121, a);
    textureLayer.circle(x, y, random(0.3, 1.0));
  }

  for (let i = 0; i < 90; i++) {
    textureLayer.stroke(127, 179, 211, 5);
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
  background(palette.nuit);
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
    saveCanvas(`DATA_RUG_IFM_12_ELJADIDA_KAMEL_GHABTE_${ts}`, 'png');
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
  stroke(31, 78, 121, 18);
  strokeWeight(0.5);
  for (let c = 0; c <= cols; c++) {
    let x = c * cellW;
    line(x, 0, x, rows * cellH);
  }
  for (let r = 0; r <= rows; r++) {
    let y = r * cellH;
    line(0, y, cols * cellW, y);
  }

  stroke(255, 28);
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

      let pulse  = sin(frameCount * 0.02 + index * 0.13) * 0.5 + 0.5;
      let energy = cell.energy * (0.75 + pulse * 0.25);

      if (cell.active) {
        drawElJadidaMotif(x, y, cellW * 0.86, cellH * 0.86, cell.type, cell.col, cell.accent, cell.rot, energy);
        cell.energy = lerp(cell.energy, 0.12, 0.05);
      } else {
        fill(31, 78, 121, 6);
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

  stroke(palette.reflet);
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
  if (temp <= 16) {
    return random([palette.citerne, palette.bastion, palette.nuit]);
  }
  if (temp >= 26) {
    return random([palette.pierre, palette.blanc, palette.reflet]);
  }
  return random([palette.citerne, palette.verdegris, palette.reflet, palette.bastion]);
}

function pickAccent(baseCol) {
  if (baseCol === palette.citerne || baseCol === palette.bastion) return palette.reflet;
  if (baseCol === palette.pierre || baseCol === palette.blanc) return palette.citerne;
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

  let complexity = floor(map(constrain(humidity, 40, 100), 40, 100, 1, 4));
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
// 10) MOTIFS EL JADIDA
// Voute croisee citerne, bastion portugais, reflet eau, meurtriere
// --------------------------------------------------
function drawElJadidaMotif(x, y, w, h, type, col, accent, rot, energy) {
  push();
  translate(x, y);
  rotate(rot);
  rectMode(CENTER);
  noStroke();
  let breath = 1 + sin(frameCount * 0.03 + x * 0.01 + y * 0.01) * 0.02 * energy;
  scale(breath);
  if (type === 0) {
    // VOUTE CROISEE -- deux arches qui se coupent, citerne
    fill(col);
    rect(0, 0, w * 0.88, h * 0.88);
    fill(accent);
    arc(0, h * 0.22, w * 0.72, h * 0.68, PI, TWO_PI);
    arc(0, -h * 0.22, w * 0.72, h * 0.68, 0, PI);
    fill(col);
    ellipse(0, 0, w * 0.18, h * 0.18);
  } else if (type === 1) {
    // BASTION PORTUGAIS -- pentagone fortifie
    fill(col);
    beginShape();
    vertex(0, -h * 0.44);
    vertex(w * 0.44, -h * 0.14);
    vertex(w * 0.28, h * 0.44);
    vertex(-w * 0.28, h * 0.44);
    vertex(-w * 0.44, -h * 0.14);
    endShape(CLOSE);
    fill(accent);
    beginShape();
    vertex(0, -h * 0.22);
    vertex(w * 0.22, -h * 0.07);
    vertex(w * 0.14, h * 0.22);
    vertex(-w * 0.14, h * 0.22);
    vertex(-w * 0.22, -h * 0.07);
    endShape(CLOSE);
    fill(col);
    ellipse(0, 0, w * 0.12, h * 0.12);
  } else if (type === 2) {
    // REFLET D EAU -- ellipses symetriques, miroir
    fill(col);
    ellipse(0, -h * 0.18, w * 0.72, h * 0.44);
    fill(accent);
    ellipse(0, h * 0.18, w * 0.72, h * 0.44);
    stroke(col);
    strokeWeight(2 * energy);
    line(-w * 0.36, 0, w * 0.36, 0);
    noStroke();
    fill(col);
    ellipse(0, 0, w * 0.1, h * 0.1);
  } else {
    // MEURTRIERE -- fente verticale dans mur epais
    fill(col);
    rect(0, 0, w * 0.88, h * 0.88);
    fill(accent);
    rect(0, 0, w * 0.12, h * 0.72);
    rect(0, 0, w * 0.44, h * 0.1);
    fill(col);
    rect(0, 0, w * 0.04, h * 0.54);
  }
  pop();
}

// --------------------------------------------------
// 11) CADRE MUSÉE
// --------------------------------------------------
function drawMuseumFrame() {
  rectMode(CORNER);

  fill(palette.nuit);
  noStroke();
  rect(0,              0,               width,  margin);
  rect(0,              height - bottomMargin, width, bottomMargin);
  rect(0,              margin,          margin, height - margin - bottomMargin);
  rect(width - margin, margin,          margin, height - margin - bottomMargin);

  noFill();
  stroke(palette.citerne);
  strokeWeight(1);
  rect(margin, margin, width - margin * 2, height - margin - bottomMargin);

  stroke(palette.reflet);
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
  text("EL JADIDA, MAROC // INSTITUT FRANÇAIS DU MAROC", margin, ty);

  fill(palette.reflet);
  textSize(11);
  text(`SYS.TIME ${yr}-${mo}-${d} [${h}:${mi}:${s}]`, margin, ty + 28);

  fill(160);
  textSize(10);
  text(
    `33.2316N / 8.5007W  //  TEMP ${nf(temp, 1, 1)}°C  HUM ${humidity}%  WIND ${nf(wind, 1, 1)} m/s`,
    margin, ty + 56
  );

  fill(120);
  text(`CONDITION : ${description}`, margin, ty + 82);

  // ---- CENTRE ----
  textAlign(CENTER, TOP);
  fill(palette.blanc);
  textSize(16);
  text("DATA RUG PROTOCOL // 12 EL JADIDA", width * 0.5, ty);

  fill(palette.reflet);
  textSize(9);
  text("MAZAGAN CISTERN PATTERN  —  Mazagan / Citerne Atlantique", width * 0.5, ty + 28);

  fill(120);
  textSize(9);
  text("KAMEL GHABTE  //  DATA ART  //  CREATIVE CODING  //  IFM 2026", width * 0.5, ty + 44);

  // Légende chromatique
  let legendY = ty + 68;
  let sw = 110;
  let sx = width * 0.5 - sw * 1.5;

  rectMode(CORNER);
  fill(palette.citerne);
  rect(sx, legendY, 10, 10);
  fill(130);
  textAlign(LEFT, TOP);
  textSize(9);
  text("≤ 16°C  CITERNE", sx + 14, legendY);

  fill(palette.verdegris);
  rect(sx + sw, legendY, 10, 10);
  fill(130);
  text("17–25°C  VERT-DE-GRIS", sx + sw + 14, legendY);

  fill(palette.pierre);
  rect(sx + sw * 2, legendY, 10, 10);
  fill(130);
  text("≥ 26°C  PIERRE CLAIRE", sx + sw * 2 + 14, legendY);

  // Légende morphologique
  let morphY = legendY + 22;
  let motifNames = ["0·BASTION", "1·CITERNE", "2·MIROIR", "3·REMPART"];
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
