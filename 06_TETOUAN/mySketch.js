// DATA RUG PROTOCOL // 06 TÉTOUAN
// ANDALUSIAN WHITE MATRIX — Andalousie Blanche / Zellige du Nord
// Artiste : Kamel Ghabte
// Commission : Institut Français du Maroc (IFM)

// --------------------------------------------------
// 1) CONFIG API
// --------------------------------------------------
let apiKey = "2f05fef27241392f92f3b94a0d889ff0";
let city = "Tetouan,MA";
let weatherData = null;

let temp = 22;
let humidity = 60;
let wind = 4;
let description = "ANDALUSIAN SIGNAL...";

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
// 3) PALETTE TÉTOUAN
// Blanc · Vert porte · Rouge · Gris · Noir
// Fond CLAIR — exception dans la série (médina blanche)
// --------------------------------------------------
let palette = {
  blanc:     "#FAFAFA",
  vert:      "#1E8449",
  rouge:     "#C0392B",
  gris:      "#95A5A6",
  noir:      "#0D0D0D",
  ivoire:    "#F5F0E8",
  andalou:   "#2C3E50"
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
      col:    palette.ivoire,
      accent: palette.vert,
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

  // Grain papier léger sur fond blanc
  for (let i = 0; i < width * height * 0.0012; i++) {
    let x = random(width);
    let y = random(height);
    let a = random(8, 22);
    textureLayer.fill(0, a);
    textureLayer.circle(x, y, random(0.3, 1.2));
  }

  for (let i = 0; i < 150; i++) {
    textureLayer.stroke(255, 16);
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
    saveCanvas(`DATA_RUG_IFM_06_TETOUAN_KAMEL_GHABTE_${ts}`, 'png');
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
  stroke(0, 18);
  strokeWeight(0.5);
  for (let c = 0; c <= cols; c++) {
    let x = c * cellW;
    line(x, 0, x, rows * cellH);
  }
  for (let r = 0; r <= rows; r++) {
    let y = r * cellH;
    line(0, y, cols * cellW, y);
  }

  stroke(0, 40);
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

      let pulse  = sin(frameCount * 0.02 + index * 0.14) * 0.5 + 0.5;
      let energy = cell.energy * (0.75 + pulse * 0.25);

      if (cell.active) {
        drawTetouanMotif(x, y, cellW * 0.86, cellH * 0.86, cell.type, cell.col, cell.accent, cell.rot, energy);
        cell.energy = lerp(cell.energy, 0.12, 0.05);
      } else {
        fill(0, 6);
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

  stroke(palette.vert);
  strokeWeight(1.4);
  line(0, y, cols * cellW, y);

  noFill();
  stroke(palette.noir);
  strokeWeight(0.8);
  rect(x, y, cellW * 0.88, cellH * 0.88);
  noStroke();
}

// --------------------------------------------------
// 8) LOGIQUE DE COULEUR
// --------------------------------------------------
function pickColor() {
  if (temp <= 16) {
    return random([palette.andalou, palette.gris, palette.vert]);
  }
  if (temp >= 28) {
    return random([palette.rouge, palette.vert, palette.ivoire]);
  }
  return random([palette.vert, palette.rouge, palette.andalou, palette.gris]);
}

function pickAccent(baseCol) {
  if (baseCol === palette.vert) return palette.rouge;
  if (baseCol === palette.rouge) return palette.vert;
  if (baseCol === palette.andalou) return palette.ivoire;
  return palette.noir;
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

  let complexity = floor(map(constrain(humidity, 30, 100), 30, 100, 1, 4));
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
// 10) MOTIFS TÉTOUAN
// Andalou, blanc, portes vertes, broderies
// --------------------------------------------------
function drawTetouanMotif(x, y, w, h, type, col, accent, rot, energy) {
  push();
  translate(x, y);
  rotate(rot);
  rectMode(CENTER);
  noStroke();

  let breath = 1 + sin(frameCount * 0.03 + x * 0.01 + y * 0.01) * 0.02 * energy;
  scale(breath);

  if (type === 0) {
    // PORTE — carré concentrique, portes andalouses
    fill(col);
    rect(0, 0, w * 0.86, h * 0.86);
    fill(accent);
    rect(0, 0, w * 0.44, h * 0.44);
    fill(palette.ivoire);
    rect(0, 0, w * 0.14, h * 0.14);

  } else if (type === 1) {
    // ARCHE — arc andalou en fer à cheval
    fill(col);
    beginShape();
    vertex(-w * 0.38, h * 0.42);
    vertex(-w * 0.38, -h * 0.02);
    bezierVertex(-w * 0.38, -h * 0.36, w * 0.38, -h * 0.36, w * 0.38, -h * 0.02);
    vertex(w * 0.38, h * 0.42);
    endShape(CLOSE);
    fill(accent);
    rect(0, h * 0.12, w * 0.5, h * 0.12);
    fill(palette.ivoire);
    rect(0, h * 0.22, w * 0.14, h * 0.14, 10);

  } else if (type === 2) {
    // BRODERIE — losange, motif textile du Nord
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
    fill(palette.ivoire);
    beginShape();
    vertex(0, -h * 0.07);
    vertex(w * 0.07, 0);
    vertex(0, h * 0.07);
    vertex(-w * 0.07, 0);
    endShape(CLOSE);

  } else {
    // MÉDINA — cercle + bandes, rythme blanc
    fill(col);
    ellipse(0, 0, w * 0.84, h * 0.84);
    fill(accent);
    rect(0, -h * 0.13, w * 0.46, h * 0.14, 999);
    rect(0,  h * 0.13, w * 0.46, h * 0.14, 999);
    fill(palette.ivoire);
    ellipse(0, 0, w * 0.16, h * 0.16);
  }

  pop();
}

// --------------------------------------------------
// 11) CADRE MUSÉE
// --------------------------------------------------
function drawMuseumFrame() {
  rectMode(CORNER);

  // Fond clair pour Tétouan (la ville blanche du Nord)
  let frameCol = color(palette.ivoire);
  frameCol.setAlpha(242);
  fill(frameCol);
  noStroke();
  rect(0,              0,               width,  margin);
  rect(0,              height - bottomMargin, width, bottomMargin);
  rect(0,              margin,          margin, height - margin - bottomMargin);
  rect(width - margin, margin,          margin, height - margin - bottomMargin);

  noFill();
  stroke(palette.noir);
  strokeWeight(1);
  rect(margin, margin, width - margin * 2, height - margin - bottomMargin);

  stroke(palette.vert);
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
  fill(100);
  textSize(10);
  text("TÉTOUAN, MAROC // INSTITUT FRANÇAIS DU MAROC", margin, ty);

  fill(palette.vert);
  textSize(11);
  text(`SYS.TIME ${yr}-${mo}-${d} [${h}:${mi}:${s}]`, margin, ty + 28);

  fill(80);
  textSize(10);
  text(
    `35.5785N / 5.3684W  //  TEMP ${nf(temp, 1, 1)}°C  HUM ${humidity}%  WIND ${nf(wind, 1, 1)} m/s`,
    margin, ty + 56
  );

  fill(100);
  text(`CONDITION : ${description}`, margin, ty + 82);

  // ---- CENTRE ----
  textAlign(CENTER, TOP);
  fill(palette.noir);
  textSize(16);
  text("DATA RUG PROTOCOL // 06 TÉTOUAN", width * 0.5, ty);

  fill(palette.vert);
  textSize(9);
  text("ANDALUSIAN WHITE MATRIX  —  Andalousie Blanche / Zellige du Nord", width * 0.5, ty + 28);

  fill(100);
  textSize(9);
  text("KAMEL GHABTE  //  DATA ART  //  CREATIVE CODING  //  IFM 2026", width * 0.5, ty + 44);

  // Légende chromatique
  let legendY = ty + 68;
  let sw = 110;
  let sx = width * 0.5 - sw * 1.5;

  rectMode(CORNER);
  fill(palette.andalou);
  rect(sx, legendY, 10, 10);
  fill(100);
  textAlign(LEFT, TOP);
  textSize(9);
  text("≤ 16°C  ANDALOU", sx + 14, legendY);

  fill(palette.vert);
  rect(sx + sw, legendY, 10, 10);
  fill(100);
  text("17–27°C  VERT PORTE", sx + sw + 14, legendY);

  fill(palette.rouge);
  rect(sx + sw * 2, legendY, 10, 10);
  fill(100);
  text("≥ 28°C  ROUGE VIF", sx + sw * 2 + 14, legendY);

  // Légende morphologique
  let morphY = legendY + 22;
  let motifNames = ["0·PORTE", "1·ARCHE", "2·BRODERIE", "3·MÉDINA"];
  let mstep = 88;
  let mx = width * 0.5 - (mstep * 1.5);
  textAlign(LEFT, TOP);
  textSize(9);
  for (let i = 0; i < motifNames.length; i++) {
    fill(80);
    rect(mx + i * mstep, morphY, 8, 8);
    fill(100);
    text(motifNames[i], mx + i * mstep + 12, morphY);
  }

  // ---- DROITE ----
  textAlign(RIGHT, TOP);
  fill(palette.noir);
  textSize(11);
  text("ALGORITHME ACTIF", width - margin, ty);

  fill(80);
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
