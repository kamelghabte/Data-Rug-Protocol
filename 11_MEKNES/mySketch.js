// DATA RUG PROTOCOL // 11 MEKNÈS
// IMPERIAL OLIVE GRID — Bab Mansour / Empire et Oliviers
// Artiste : Kamel Ghabte
// Commission : Institut Français du Maroc (IFM)

// --------------------------------------------------
// 1) CONFIG API
// --------------------------------------------------
let apiKey = "2f05fef27241392f92f3b94a0d889ff0";
let city = "Meknes,MA";
let weatherData = null;

let temp = 25;
let humidity = 45;
let wind = 3;
let description = "IMPERIAL SIGNAL...";

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
// 3) PALETTE MEKNÈS
// Vert olive · Pierre · Or impérial · Terre cuite · Noir
// --------------------------------------------------
let palette = {
  olive:  "#4A5D23",
  pierre: "#8D8166",
  or:     "#C9A84C",
  terre:  "#8B4513",
  noir:   "#0A0A0A",
  ivoire: "#FDFEFE",
  kaki:   "#6B8E23"
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

  for (let i = 0; i < width * height * 0.0008; i++) {
    let x = random(width);
    let y = random(height);
    let a = random(4, 12);
    textureLayer.fill(141, 129, 102, a);
    textureLayer.circle(x, y, random(0.3, 1.0));
  }

  for (let i = 0; i < 70; i++) {
    textureLayer.stroke(201, 168, 76, 5);
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
    saveCanvas(`DATA_RUG_IFM_11_MEKNES_KAMEL_GHABTE_${ts}`, 'png');
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
  stroke(141, 129, 102, 16);
  strokeWeight(0.5);
  for (let c = 0; c <= cols; c++) {
    let x = c * cellW;
    line(x, 0, x, rows * cellH);
  }
  for (let r = 0; r <= rows; r++) {
    let y = r * cellH;
    line(0, y, cols * cellW, y);
  }

  stroke(255, 25);
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

      let pulse  = sin(frameCount * 0.018 + index * 0.12) * 0.5 + 0.5;
      let energy = cell.energy * (0.75 + pulse * 0.25);

      if (cell.active) {
        drawMeknesMotif(x, y, cellW * 0.86, cellH * 0.86, cell.type, cell.col, cell.accent, cell.rot, energy);
        cell.energy = lerp(cell.energy, 0.12, 0.05);
      } else {
        fill(141, 129, 102, 6);
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
  stroke(palette.ivoire);
  strokeWeight(0.8);
  rect(x, y, cellW * 0.88, cellH * 0.88);
  noStroke();
}

// --------------------------------------------------
// 8) LOGIQUE DE COULEUR
// --------------------------------------------------
function pickColor() {
  if (temp >= 32) {
    return random([palette.terre, palette.or, palette.pierre]);
  }
  if (temp <= 16) {
    return random([palette.olive, palette.noir, palette.kaki]);
  }
  return random([palette.olive, palette.pierre, palette.or, palette.terre]);
}

function pickAccent(baseCol) {
  if (baseCol === palette.olive || baseCol === palette.kaki) return palette.or;
  if (baseCol === palette.or || baseCol === palette.terre) return palette.olive;
  return palette.ivoire;
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

  let complexity = floor(map(constrain(humidity, 25, 80), 25, 80, 1, 4));
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
  let ghostVelocity = map(constrain(wind + humidity * 0.03, 0, 10), 0, 10, 30, 85);
  weavePattern(ghostVelocity);
}

// --------------------------------------------------
// 10) MOTIFS MEKNES
// Bab Mansour, olive, symetrie imperiale, mosaique Volubilis
// --------------------------------------------------
function drawMeknesMotif(x, y, w, h, type, col, accent, rot, energy) {
  push();
  translate(x, y);
  rotate(rot);
  rectMode(CENTER);
  noStroke();
  let breath = 1 + sin(frameCount * 0.03 + x * 0.01 + y * 0.01) * 0.02 * energy;
  scale(breath);
  if (type === 0) {
    // BAB MANSOUR -- grande porte, deux pilastres
    fill(col);
    rect(0, h * 0.08, w * 0.88, h * 0.72);
    fill(accent);
    rect(-w * 0.28, h * 0.08, w * 0.2, h * 0.72);
    rect(w * 0.28, h * 0.08, w * 0.2, h * 0.72);
    fill(col);
    beginShape();
    vertex(-w * 0.22, -h * 0.2);
    vertex(-w * 0.22, -h * 0.36);
    bezierVertex(-w * 0.22, -h * 0.5, w * 0.22, -h * 0.5, w * 0.22, -h * 0.36);
    vertex(w * 0.22, -h * 0.2);
    endShape(CLOSE);
    fill(accent);
    rect(0, -h * 0.2, w * 0.44, h * 0.06);
  } else if (type === 1) {
    // OLIVE -- ellipse + feuilles
    fill(col);
    ellipse(0, 0, w * 0.44, h * 0.72);
    fill(accent);
    push(); rotate(PI / 5);
    ellipse(0, -h * 0.22, w * 0.26, h * 0.14);
    pop();
    push(); rotate(-PI / 5);
    ellipse(0, -h * 0.22, w * 0.26, h * 0.14);
    pop();
    fill(col);
    ellipse(0, h * 0.08, w * 0.1, h * 0.1);
  } else if (type === 2) {
    // SYMETRIE IMPERIALE -- axe central, miroir parfait
    fill(col);
    rect(0, 0, w * 0.88, h * 0.88);
    fill(accent);
    rect(0, 0, w * 0.06, h * 0.88);
    for (let i = 1; i <= 3; i++) {
      fill(i % 2 === 0 ? col : accent);
      rect(-w * 0.3, -h * 0.38 + i * h * 0.2, w * 0.24, h * 0.1);
      rect(w * 0.3, -h * 0.38 + i * h * 0.2, w * 0.24, h * 0.1);
    }
  } else {
    // VOLUBILIS -- mosaique hexagonale romaine
    fill(col);
    rect(0, 0, w * 0.88, h * 0.88);
    fill(accent);
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        if ((r + c) % 2 === 0) {
          push();
          translate(c * w * 0.28, r * h * 0.28);
          beginShape();
          for (let a = 0; a < 6; a++) {
            let ang = (a / 6) * TWO_PI;
            vertex(cos(ang) * w * 0.12, sin(ang) * h * 0.12);
          }
          endShape(CLOSE);
          pop();
        }
      }
    }
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
  stroke(palette.olive);
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
  text("MEKNÈS, MAROC // INSTITUT FRANÇAIS DU MAROC", margin, ty);

  fill(palette.or);
  textSize(11);
  text(`SYS.TIME ${yr}-${mo}-${d} [${h}:${mi}:${s}]`, margin, ty + 28);

  fill(160);
  textSize(10);
  text(
    `33.8935N / 5.5473W  //  TEMP ${nf(temp, 1, 1)}°C  HUM ${humidity}%  WIND ${nf(wind, 1, 1)} m/s`,
    margin, ty + 56
  );

  fill(120);
  text(`CONDITION : ${description}`, margin, ty + 82);

  // ---- CENTRE ----
  textAlign(CENTER, TOP);
  fill(palette.ivoire);
  textSize(16);
  text("DATA RUG PROTOCOL // 11 MEKNÈS", width * 0.5, ty);

  fill(palette.or);
  textSize(9);
  text("IMPERIAL OLIVE GRID  —  Bab Mansour / Empire et Oliviers", width * 0.5, ty + 28);

  fill(120);
  textSize(9);
  text("KAMEL GHABTE  //  DATA ART  //  CREATIVE CODING  //  IFM 2026", width * 0.5, ty + 44);

  // Légende chromatique
  let legendY = ty + 68;
  let sw = 110;
  let sx = width * 0.5 - sw * 1.5;

  rectMode(CORNER);
  fill(palette.olive);
  rect(sx, legendY, 10, 10);
  fill(130);
  textAlign(LEFT, TOP);
  textSize(9);
  text("≤ 16°C  OLIVE FROID", sx + 14, legendY);

  fill(palette.pierre);
  rect(sx + sw, legendY, 10, 10);
  fill(130);
  text("17–31°C  PIERRE", sx + sw + 14, legendY);

  fill(palette.terre);
  rect(sx + sw * 2, legendY, 10, 10);
  fill(130);
  text("≥ 32°C  TERRE SÈCHE", sx + sw * 2 + 14, legendY);

  // Légende morphologique
  let morphY = legendY + 22;
  let motifNames = ["0·BAB", "1·VOLUBILIS", "2·OLIVIER", "3·EMPIRE"];
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
  fill(palette.ivoire);
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
