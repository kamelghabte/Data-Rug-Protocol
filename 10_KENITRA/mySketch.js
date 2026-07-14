// ════════════════════════════════════════════════════════════════
//  KENITRA ZELLIGE  —  Weather Weaving
//  Institut Français du Maroc · Œuvre 10
// ════════════════════════════════════════════════════════════════
//  5 curseurs simultanés · marée atlantique · erosion du joint ·
//  mode nuit Casablanca · brume chbab · dawwama rayonnante
// ════════════════════════════════════════════════════════════════

let apiKey = "2f05fef27241392f92f3b94a0d889ff0";
let city   = "Kenitra,MA";

let temp        = 20;
let humidity    = 65;
let wind        = 4;
let description = "LOADING DATA...";

// ─── GRILLE ────────────────────────────────────────────────────
let loomGrid = [];
let cols = 18;
let rows = 22;
let cellW, cellH;

// ─── 5 CURSEURS — chacun a sa propre trajectoire ───────────────
// Ils coexistent comme 5 artisans zellij sur un même chantier
let cursors = [
  { pos: 0,            dir: 1,   speed: 1,   type: "SNAKE"    }, // serpente ligne/ligne
  { pos: 0,            dir: 1,   speed: 2,   type: "DIAGONAL" }, // vagues diagonales
  { pos: 0,            dir: -1,  speed: 1,   type: "REVERSE"  }, // remonte depuis la fin
  { pos: 0,            dir: 1,   speed: 3,   type: "SKIP"     }, // saute de 3 cases
  { pos: 0,            dir: 1,   speed: 1,   type: "SPIRAL"   }, // spirale depuis le centre
];

// Ordres de parcours précalculés
let orderSnake    = [];
let orderDiag     = [];
let orderSpiral   = [];

let generation    = 0;
let lastPlaced    = [];   // indices des 5 dernières tuiles posées (un par curseur)
let tidePhase     = 0;    // oscillation lente — marée atlantique

// ─── PALETTES ──────────────────────────────────────────────────
// Palette JOUR — lumière méditerranéenne sur le blanc de Casablanca
let palDay = [
  '#1D6A39',
  '#7D6608',
  '#2E86C1',
  '#FDFEFE',
  '#6E2F1A',
  '#1A5276',
  '#58D68D',
  '#0A0C0A',
];

// Palette NUIT — Casablanca après 21h : indigo, or, brume bleue
let palNight = [
  '#040E06',
  '#0A1E10',
  '#142E1A',
  '#1A3E24',
  '#6E2F1A',
  '#0E3818',
  '#D5E8D8',
  '#060806',
];

// Palette TEMPÊTE — quand le vent dépasse 12 m/s
let palStorm = [
  '#040806',
  '#0A100C',
  '#141A14',
  '#1A241C',
  '#90A090',
  '#607060',
  '#1A2C20',
  '#040604',
];

// ─── LAYOUT ────────────────────────────────────────────────────
let margin       = 80;
let bottomMargin = 180;

// ─── MIDI ──────────────────────────────────────────────────────
let midiAccess     = null;
let lastActionTime = 0;

// ─── HEURE LOCALE CASABLANCA ───────────────────────────────────
function isNightInKENITRA() {
  // UTC+1 (Maroc heure standard) / UTC+0 hiver
  let h = (new Date().getUTCHours() + 1) % 24;
  return h >= 21 || h < 6;
}

// ───────────────────────────────────────────────────────────────
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  recalcGrid();
  buildOrders();
  initGrid();

  // Curseurs initialisés à des positions distribuées
  cursors[0].pos = 0;
  cursors[1].pos = 0;
  cursors[2].pos = cols * rows - 1;
  cursors[3].pos = floor(cols * rows / 3);
  cursors[4].pos = 0;

  loadJSON(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    gotWeather
  );

  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  }
}

function recalcGrid() {
  cellW = (width  - margin * 2) / cols;
  cellH = (height - margin - bottomMargin) / rows;
}

// Construction des 3 ordres de parcours
function buildOrders() {
  // SNAKE — ligne par ligne, sens alternés
  orderSnake = [];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < cols; c++) row.push(c + r * cols);
    if (r % 2 !== 0) row.reverse();
    orderSnake = orderSnake.concat(row);
  }

  // DIAGONAL — vagues ↘↗ alternées
  orderDiag = [];
  let numD = cols + rows - 1;
  for (let d = 0; d < numD; d++) {
    let wave = [];
    for (let c = max(0, d-(rows-1)); c <= min(d, cols-1); c++) {
      wave.push(c + (d-c)*cols);
    }
    if (d % 2 !== 0) wave.reverse();
    orderDiag = orderDiag.concat(wave);
  }

  // SPIRAL — depuis les bords vers le centre
  orderSpiral = [];
  let t=0, b=rows-1, l=0, r2=cols-1;
  while (t<=b && l<=r2) {
    for (let c=l; c<=r2; c++) orderSpiral.push(c + t*cols);
    t++;
    for (let row=t; row<=b; row++) orderSpiral.push(r2 + row*cols);
    r2--;
    if (t<=b) { for (let c=r2; c>=l; c--) orderSpiral.push(c + b*cols); b--; }
    if (l<=r2) { for (let row=b; row>=t; row--) orderSpiral.push(l + row*cols); l++; }
  }
}

function initGrid() {
  loomGrid = [];
  for (let i = 0; i < cols * rows; i++) {
    loomGrid.push({
      type:   0,
      col:    '#092E7A',
      active: false,
      age:    0,        // âge en cycles (max 4)
      born:   0,        // millis() quand posée — pour fade-in
    });
  }
}

function gotWeather(data) {
  temp        = data.main.temp;
  humidity    = data.main.humidity;
  wind        = data.wind.speed;
  description = data.weather[0].description.toUpperCase();
}

function onMIDISuccess(midi) {
  midiAccess = midi;
  for (let input of midiAccess.inputs.values()) {
    input.onmidimessage = handleMIDIMessage;
  }
}
function onMIDIFailure() {}

function handleMIDIMessage(message) {
  const d = message.data;
  if (d[0] === 144 && d.length > 2 && d[2] > 0) {
    // Vélocité forte = tous les curseurs activés d'un coup
    let burst = d[2] > 100 ? cursors.length : 1;
    for (let b = 0; b < burst; b++) weaveAll(d[2]);
    lastActionTime = millis();
  }
}

// ─── DRAW ───────────────────────────────────────────────────────
function draw() {

  // Fond respirant — la marée change l'intensité du fond
  tidePhase += 0.004;
  let tide = map(sin(tidePhase), -1, 1, 0, 8);
  background(8 + tide, 12 + tide, 28 + tide * 2);

  // AUTO-PILOT — vitesse ← vent
  // Vent fort = urgence du chantier, toutes les mains travaillent vite
  let autoSpeed = map(wind, 0, 20, 980, 80);
  if (millis() - lastActionTime > autoSpeed) {
    weaveAll(random(55, 100));
    lastActionTime = millis();
  }

  push();
  translate(margin, margin);

  // ── DESSIN DE LA GRILLE ──
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let idx  = c + r * cols;
      let cell = loomGrid[idx];
      let x = c * cellW;
      let y = r * cellH;

      if (cell.active) {

        // Fade-in à la pose — la tuile "arrive" en 300ms
        let elapsed = millis() - cell.born;
        let fadeIn  = min(1.0, elapsed / 300.0);

        // Erosion du joint avec l'âge — le mortier sèche, le joint s'élargit
        // Génération 0 : tuile pleine · Génération 3 : tuile réduite de 4px
        let grout = cell.age * 1.2;
        let tx = x + grout;
        let ty = y + grout;
        let tw = (cellW - grout * 2) * fadeIn;
        let th = (cellH - grout * 2) * fadeIn;

        // Vague de marée atlantique — très légère ondulation verticale par colonne
        // Les colonnes paires et impaires oscillent en opposition de phase
        let tideShift = sin(tidePhase + c * 0.4) * 1.2;
        ty += tideShift;

        if (tw > 0 && th > 0) {
          drawZelligeMotif(tx, ty, tw, th, cell.type, cell.col);
        }

      } else {
        // Trame vide — petit losange de tracé, comme le tesserae brut non posé
        stroke(18, 28, 55); strokeWeight(0.4);
        let pcx = x + cellW/2;
        let pcy = y + cellH/2;
        let ps  = 2.8;
        line(pcx-ps, pcy, pcx, pcy-ps);
        line(pcx, pcy-ps, pcx+ps, pcy);
        line(pcx+ps, pcy, pcx, pcy+ps);
        line(pcx, pcy+ps, pcx-ps, pcy);
        noStroke();
      }
    }
  }

  // ── 5 NAVETTES — une par curseur, chacune avec sa signature ──
  let navStyles = [
    { col: '#C8A65A', w: 1.5, dash: [4, 6]  },  // Snake — or
    { col: '#2A9CC8', w: 1.0, dash: [2, 8]  },  // Diagonal — turquoise
    { col: '#B83A0A', w: 0.8, dash: [1, 10] },  // Reverse — terracotta
    { col: '#EFE8D8', w: 0.6, dash: [6, 4]  },  // Skip — blanc plâtre
    { col: '#2C5840', w: 0.8, dash: [3, 7]  },  // Spiral — vert menthe
  ];

  for (let ci = 0; ci < cursors.length; ci++) {
    let cur   = cursors[ci];
    let order = getOrder(cur.type);
    let pos   = cur.pos % order.length;
    let idx   = order[pos];
    let cr    = floor(idx / cols);
    let curY  = cr * cellH + cellH;
    let ns    = navStyles[ci];

    stroke(ns.col); strokeWeight(ns.w);
    drawingContext.setLineDash(ns.dash);
    line(0, curY, width - margin*2, curY);
    drawingContext.setLineDash([]);
    noStroke();
  }

  // ── POINT VIVANT — dernière tuile posée de chaque curseur ──
  for (let ci = 0; ci < min(lastPlaced.length, cursors.length); ci++) {
    if (lastPlaced[ci] == null) continue;
    let idx = lastPlaced[ci];
    let lc  = idx % cols;
    let lr  = floor(idx / cols);
    let px  = lc * cellW + cellW/2;
    let py  = lr * cellH + cellH/2;
    let pulse = map(sin(millis() * 0.008 + ci * 1.2), -1, 1, 0.3, 1.0);
    noFill(); stroke(navStyles[ci].col + 'AA'); strokeWeight(0.8);
    let ps = (min(cellW, cellH)/2 - 2) * pulse;
    rect(px - ps, py - ps, ps*2, ps*2);
    fill(navStyles[ci].col); noStroke();
    ellipse(px, py, 3, 3);
  }

  pop();

  drawMuseumFrame();
  drawLegend();
  drawCasaStats();

  if (mouseIsPressed) weaveAll(random(55, 100));
}

// ─── TISSAGE ────────────────────────────────────────────────────
function weaveAll(velocity) {
  for (let ci = 0; ci < cursors.length; ci++) {
    weaveOne(velocity, ci);
  }
}

function weaveOne(velocity, ci) {
  let cur   = cursors[ci];
  let order = getOrder(cur.type);

  // Réinitialisation du cycle
  if (cur.pos >= order.length) {
    cur.pos = 0;
    if (ci === 0) {
      generation++;
      // Vieillissement : les carreaux pleins et losanges survivent, les autres disparaissent
      // Effet d'usure progressive — seule la géométrie fondamentale persiste
      for (let i = 0; i < loomGrid.length; i++) {
        if (loomGrid[i].type === 0 || loomGrid[i].type === 3) {
          loomGrid[i].age = min(loomGrid[i].age + 1, 4);
        } else if (loomGrid[i].type === 4) {
          // La dawwama tient deux cycles — motif fort
          if (loomGrid[i].age >= 2) {
            loomGrid[i].active = false; loomGrid[i].age = 0;
          } else {
            loomGrid[i].age++;
          }
        } else {
          loomGrid[i].active = false; loomGrid[i].age = 0;
        }
      }
    }
  }

  let idx = order[cur.pos];
  lastPlaced[ci] = idx;

  // ── MOTIF ← humidité + curseur
  // Chaque curseur a une "spécialité" — son motif dominant
  let typeWeights;
  if      (ci === 0) typeWeights = [4, 2, 1, 1, 1]; // snake → surtout carreau plein
  else if (ci === 1) typeWeights = [1, 3, 2, 1, 1]; // diagonal → bandes
  else if (ci === 2) typeWeights = [1, 1, 3, 2, 1]; // reverse → damier+losange
  else if (ci === 3) typeWeights = [1, 1, 1, 3, 2]; // skip → losange+dawwama
  else               typeWeights = [1, 2, 1, 2, 3]; // spiral → dawwama dominante

  // La complexité augmente avec l'humidité
  let humFactor = map(humidity, 30, 95, 0.3, 1.0);
  let type = weightedRandom(typeWeights, humFactor);

  // ── COULEUR ← température + heure + vent
  let pal;
  if (wind > 12)     pal = palStorm;
  else if (isNightInKENITRA()) pal = palNight;
  else               pal = palDay;

  let col;
  if (temp > 26) {
    col = random([pal[4], pal[5], pal[4], pal[5], pal[3]]); // chaud : or+terracotta
  } else if (temp < 15) {
    col = random([pal[0], pal[1], pal[2], pal[3], pal[0]]); // froid : bleus
  } else {
    col = random(pal);
  }

  // Brume chbab — humidité > 75% : dérive progressive vers le blanc plâtre
  if (humidity > 75 && random() < map(humidity, 75, 100, 0, 0.7)) {
    col = lerpColor(color(col), color(isNightInKENITRA() ? '#E8E0D2' : '#EFE8D8'),
                    map(humidity, 75, 100, 0, 0.6)).toString('#rrggbb');
  }

  // MIDI fort → nuit graphique
  if (velocity > 108) col = isNightInKENITRA() ? '#04112E' : '#0A1828';

  loomGrid[idx].type   = type;
  loomGrid[idx].col    = col;
  loomGrid[idx].active = true;
  loomGrid[idx].born   = millis();

  cur.pos += cur.speed;
}

// Sélection pondérée du motif selon weights + humidité
function weightedRandom(weights, humFactor) {
  // Plus l'humidité est haute, plus les motifs avancés (index élevé) sont accessibles
  let scaled = weights.map((w, i) => {
    let threshold = i / (weights.length - 1);
    return w * (threshold <= humFactor ? 1.0 : 0.1);
  });
  let total = scaled.reduce((a,b) => a+b, 0);
  let r = random(total);
  let acc = 0;
  for (let i = 0; i < scaled.length; i++) {
    acc += scaled[i];
    if (r <= acc) return i;
  }
  return 0;
}

function getOrder(type) {
  if (type === "DIAGONAL" || type === "SKIP") return orderDiag;
  if (type === "SPIRAL")                      return orderSpiral;
  return orderSnake; // SNAKE + REVERSE utilisent le snake (le reverse marche à reculons)
}

// ─── 5 MOTIFS ZELLIGE ───────────────────────────────────────────
function drawZelligeMotif(x, y, w, h, type, col) {
  fill(col); noStroke();
  let cx = x + w/2;
  let cy = y + h/2;

  if (type === 0) {
    // GHABBA — Carreau plein, forêt
    rect(x, y, w, h);
  } else if (type === 1) {
    // FELLANE — Bandes verticales, veines du liège
    let sw = w/3;
    for (let i = 0; i < 3; i += 2) rect(x + i*sw, y, sw, h);
  } else if (type === 2) {
    // SEBOU — Bandes horizontales, fleuve
    let sh = h/3;
    for (let i = 0; i < 3; i += 2) rect(x, y + i*sh, w, sh);
  } else if (type === 3) {
    // MEHDIA — Losange, estuaire
    quad(cx, y, x+w, cy, cx, y+h, x, cy);
  } else {
    // HALQA — Hélice, anneaux du bois
    triangle(x, y, x+w, y, cx, cy);
    triangle(x+w, y+h, x, y+h, cx, cy);
    fill(lerpColor(color(col), color(10, 12, 10), 0.45));
    triangle(x+w, y, x+w, y+h, cx, cy);
    triangle(x, y+h, x, y, cx, cy);
  }
}

// ─── CADRE MUSEUM ───────────────────────────────────────────────
function drawMuseumFrame() {
  fill(8, 12, 28); noStroke(); rectMode(CORNER);
  rect(0, 0,              width, margin);
  rect(0, height - bottomMargin, width, bottomMargin);
  rect(0, margin,         margin, height - margin - bottomMargin);
  rect(width - margin, margin, margin, height - margin - bottomMargin);

  // Cadre or — épaisseur varie avec la marée
  let tideW = map(sin(tidePhase), -1, 1, 0.8, 1.6);
  noFill(); stroke('#C8A65A'); strokeWeight(tideW);
  rect(margin, margin, width - margin*2, height - margin - bottomMargin);

  // Liseré intérieur bleu nuit
  stroke(25, 40, 75); strokeWeight(0.5);
  rect(margin+5, margin+5, width - margin*2 - 10, height - margin - bottomMargin - 10);

  // Ornements de coin — équerre triple
  stroke('#C8A65A'); strokeWeight(tideW);
  let cl = 16;
  for (let [fx, fy, sx, sy] of [
    [margin,       margin,               1,  1],
    [width-margin, margin,              -1,  1],
    [width-margin, height-bottomMargin, -1, -1],
    [margin,       height-bottomMargin,  1, -1]
  ]) {
    line(fx,       fy,        fx+sx*cl, fy       );
    line(fx,       fy,        fx,       fy+sy*cl );
    line(fx+sx*5,  fy+sy*5,   fx+sx*cl, fy+sy*5  );
    line(fx+sx*5,  fy+sy*5,   fx+sx*5,  fy+sy*cl );
  }
  noStroke();

  // ── EN-TÊTE ──
  // Gauche — IFM
  textFont('Courier New'); textAlign(LEFT, CENTER);
  textSize(8); textStyle(BOLD);
  fill(isNightInKENITRA() ? '#C8A65A' : '#C8A65A');
  text("INSTITUT FRANÇAIS DU MAROC", margin, margin/2 - 7);
  textSize(7); textStyle(NORMAL); fill(50, 75, 125);
  text("COLLECTION AFRIC'ARTECH  ·  WEATHER WEAVING", margin, margin/2 + 7);

  // Centre — nuit ou jour change la calligraphie
  textFont('Georgia'); textSize(15); textStyle(ITALIC);
  fill('#C8A65A'); textAlign(CENTER, CENTER);
  text(isNightInKENITRA() ? "القنيطرة بالليل" : "زليج القنيطرة", width/2, margin/2);

  // Droite — n° + génération + mode
  textFont('Courier New'); textAlign(RIGHT, CENTER);
  textSize(7); textStyle(NORMAL); fill(50, 75, 125);
  text((isNightInKENITRA() ? "◆ NUIT · " : "◇ JOUR · ") + "GÉN " + nf(generation, 2), width - margin, margin/2 - 7);
  textSize(20); textStyle(BOLD); fill('#C8A65A');
  text("10", width - margin, margin/2 + 6);
}

// ─── LÉGENDE ────────────────────────────────────────────────────
function drawLegend() {
  let bandY    = height - bottomMargin + 10;
  let previewS = 32;
  let totalW   = width - margin * 2;
  let itemW    = totalW / 5;

  let defs = [
    { type:0, ar:"غابة",   name:"GHABBA",   ref:"FORET · SNAKE"    },
    { type:1, ar:"فلّان",   name:"FELLANE",   ref:"LIEGE · DIAG"    },
    { type:2, ar:"سبو",   name:"SEBOU",   ref:"FLEUVE · REVERSE"    },
    { type:3, ar:"المهدية",   name:"MEHDIA",   ref:"PORT · SKIP"    },
    { type:4, ar:"حلقة",   name:"HALQA",   ref:"ANNEAU · SPIRAL"    },
  ];

  // Couleurs représentatives selon heure
  let night = isNightInKENITRA();
  let rc = night
    ? ['#0A2562','#1A3A8A','#8A1A00','#C8A65A','#142E6A']
    : ['#092E7A','#2A9CC8','#B83A0A','#C8A65A','#1460C0'];

  textFont('Courier New'); noStroke();

  // Titre légende
  textSize(7.5); textStyle(BOLD); fill('#C8A65A'); textAlign(LEFT, TOP);
  text("RÉPERTOIRE  ·  فهرس الزليج", margin, bandY);

  // Barre brume — dégradé turquoise→blanc plâtre
  let bW = 100; let bX = width - margin - bW;
  textSize(6.5); textStyle(NORMAL); fill(50, 75, 120); textAlign(RIGHT, TOP);
  text("CHBAB →", bX - 6, bandY + 1);
  fill(15, 24, 50); rect(bX, bandY + 2, bW, 4);
  let bFill = map(humidity, 30, 95, 0, bW);
  // Dégradé manuel sur la barre
  for (let bx = 0; bx < bFill; bx++) {
    let t = bx / bW;
    fill(lerpColor(color('#2A9CC8'), color('#EFE8D8'), t));
    rect(bX + bx, bandY + 2, 1, 4);
  }

  // Séparateur
  stroke(22, 35, 68); strokeWeight(0.5);
  line(margin, bandY + 16, width - margin, bandY + 16);
  noStroke();

  let rowY = bandY + 22;

  for (let i = 0; i < defs.length; i++) {
    let def = defs[i];
    let ix  = margin + i * itemW + (itemW - previewS) / 2;

    drawZelligeMotif(ix, rowY, previewS, previewS, def.type, rc[i]);
    noFill(); stroke(22, 35, 68); strokeWeight(0.5);
    rect(ix, rowY, previewS, previewS);
    noStroke();

    textAlign(CENTER, TOP);

    // Nom arabe — priorité
    textFont('Georgia'); textStyle(ITALIC); textSize(10);
    fill('#C8A65A');
    text(def.ar, ix + previewS/2, rowY + previewS + 3);

    // Translittération
    textFont('Courier New'); textStyle(BOLD); textSize(6.5);
    fill('#EFE8D8');
    text(def.name, ix + previewS/2, rowY + previewS + 17);

    // Ref météo + curseur
    textStyle(NORMAL); textSize(5.5); fill(50, 75, 120);
    text(def.ref, ix + previewS/2, rowY + previewS + 28);
  }

  textAlign(LEFT, TOP);
}

// ─── STATS ──────────────────────────────────────────────────────
function drawCasaStats() {
  fill(255); noStroke(); textAlign(LEFT, TOP);
  let startX = margin;
  let startY = height - bottomMargin + 118;

  textFont('Courier New'); textSize(16); textStyle(BOLD);
  fill('#C8A65A');
  text("KENITRA_SEBOU // WEATHER_WEAVE", width/2 - 215, startY);

  textSize(7); textStyle(NORMAL); fill(42, 62, 105);
  text("Institut Français du Maroc  ·  Œuvre 10 / 12", width/2 - 138, startY + 20);

  textSize(8.5); textStyle(NORMAL); fill(130, 155, 195);
  text("LOC: KENITRA, MAROC", startX, startY);

  fill('#2A9CC8');
  text(`TEMP: ${nf(temp,2,1)}°C`,       startX,       startY + 14);
  text(`HUMIDITY: ${humidity}%`,         startX,       startY + 28);
  text(`WIND: ${nf(wind,1,1)} m/s`,     startX + 165, startY + 14);
  text(`COND: ${description}`,           startX + 165, startY + 28);

  textAlign(RIGHT, TOP); fill(50, 75, 120); textSize(8.5);
  text("LIVE DATA VISUALIZATION", width - margin, startY);
  textSize(7); fill(35, 52, 95);
  text("MIDI BIODATA ENABLED", width - margin, startY + 14);
}

// ─── RESIZE ─────────────────────────────────────────────────────
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  recalcGrid();
  buildOrders();
}