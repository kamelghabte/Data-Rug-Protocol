// TITRE : DATA RUG PROTOCOL // 1-54 CONTEMPORARY EDITION (MARRAKESH)
// COLLECTION : AFRIC'ARTECH
// CIBLE : 1-54 Art Fair (Édition Marrakech)
// MOTEUR : Néo-Zellige, Typographie Fine & Minimaliste (Galerie)

// --- API SETUP ---
let apiKey = "2f05fef27241392f92f3b94a0d889ff0"; 
let city = "Marrakesh,MA"; // Cible mise à jour sur Marrakech
let weatherData = null;

let temp = 28;
let humidity = 40;
let wind = 4;
let description = "SYNCING WITH MARRAKESH...";

// --- GRILLE DE TISSAGE ---
let loomGrid = [];
let cols = 10;
let rows = 12; 
let cellW, cellH;
let weaveCursor = 0; 
let lastActionTime = 0;

// --- PALETTE 1-54 CONTEMPORARY ---
let colors = {
    crimson:    '#D92525',  
    cadmium:    '#FFC800',  
    ultramarine:'#004B87',  
    gallery:    '#FDFDFD',  
    ink:        '#1A1A1A'   
};

let margin = 80;
let bottomMargin = 160;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  loadJSON(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`, gotWeather);
  
  let drawW = width - margin * 2;
  let drawH = height - margin - bottomMargin;
  cellW = drawW / cols;
  cellH = drawH / rows;
  
  for(let i=0; i<cols*rows; i++) {
      loomGrid.push({ type: 0, col: colors.gallery, active: false });
  }

  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(onMIDISuccess, (e) => console.log("No MIDI", e));
  }
}

function gotWeather(data) {
  weatherData = data;
  temp = data.main.temp;
  humidity = data.main.humidity;
  wind = data.wind.speed;
  description = data.weather[0].description.toUpperCase();
}

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

function draw() {
  background(colors.gallery); // FOND BLANC PUR

  // AUTO-PILOT
  let autoSpeed = map(wind, 0, 15, 800, 150); 
  if (millis() - lastActionTime > autoSpeed) {
      autoWeave();
      lastActionTime = millis();
  }

  push();
  translate(margin, margin);
  
  // 1. Fils de trame (Gris très fin)
  stroke(245); 
  strokeWeight(1);
  for(let c=0; c<cols; c++) {
      let x = c * cellW + cellW/2;
      line(x, 0, x, rows * cellH);
  }
  noStroke();

  // 2. Grille et motifs
  for(let r=0; r<rows; r++) {
      for(let c=0; c<cols; c++) {
          let index = c + r * cols;
          let cell = loomGrid[index];
          
          let x = c * cellW + cellW/2;
          let y = r * cellH + cellH/2;
          
          if(cell.active) {
              drawContemporaryMotif(x, y, cellW * 0.85, cellH * 0.85, cell.type, cell.col);
          }
      }
  }
  
  // 3. Navette (Curseur horizontal Noir Encre)
  let cursorY = floor((weaveCursor % (cols * rows)) / cols) * cellH;
  stroke(colors.ink); 
  strokeWeight(2); // Affiné
  line(0, cursorY + cellH, width - margin*2, cursorY + cellH);
  
  pop();

  // --- HABILLAGE ET LÉGENDE ---
  drawMuseumFrame();
  drawHUD();
  
  if(mouseIsPressed && frameCount % 5 === 0) autoWeave();
}

function weavePattern(velocity) {
    let index = weaveCursor % (cols * rows);
    let type = weaveCursor % 3; 
    
    // Seuils climatiques ajustés pour Marrakech
    let col;
    if(temp >= 30) {
        col = random([colors.crimson, colors.cadmium]); 
    } 
    else if(temp <= 20) {
        col = random([colors.ultramarine, colors.ink]); 
    } else {
        col = random([colors.crimson, colors.ultramarine, colors.cadmium]); 
    }

    loomGrid[index].type = type;
    loomGrid[index].col = col;
    loomGrid[index].active = true;
    
    weaveCursor++;
}

function autoWeave() {
    weavePattern(80);
}

function drawContemporaryMotif(x, y, w, h, type, col) {
    push();
    translate(x, y);
    rectMode(CENTER);
    noStroke();
    
    if (type === 0) { 
        fill(col);
        quad(0, -h/2, w/2, 0, 0, h/2, -w/2, 0);
        fill(colors.gallery); 
        quad(0, -h/4, w/4, 0, 0, h/4, -w/4, 0);
        fill(colors.ink); 
        ellipse(0, 0, w/6, w/6);
    } 
    else if (type === 1) { 
        fill(col);
        beginShape();
        vertex(-w/2, -h/4); vertex(0, -h/2); vertex(w/2, -h/4);
        vertex(w/2, h/4); vertex(0, 0); vertex(-w/2, h/4);
        endShape(CLOSE);
        
        fill(colors.ink); 
        rect(0, 0, w, h/8);
        rect(0, -h/5, w, h/20);
        rect(0, h/5, w, h/20);
        
        fill(colors.cadmium); 
        ellipse(0, 0, w/12, w/12);
    } 
    else { 
        fill(col);
        triangle(-w/2, -h/2, w/2, -h/2, 0, 0);
        triangle(-w/2, h/2, w/2, h/2, 0, 0);
        
        fill(colors.cadmium); 
        rect(0, -h/2, w, h/10);
        rect(0, h/2, w, h/10);
        
        fill(colors.ink); 
        quad(0, -h/8, w/10, 0, 0, h/8, -w/10, 0);
    }
    pop();
}

function drawMuseumFrame() {
    fill(colors.gallery); noStroke(); rectMode(CORNER);
    rect(0, 0, width, margin);
    rect(0, height - bottomMargin, width, bottomMargin);
    rect(0, margin, margin, height - margin - bottomMargin);
    rect(width - margin, margin, width-margin, height - margin - bottomMargin); 
    
    // Cadre Noir très fin
    noFill(); stroke(colors.ink); strokeWeight(1); 
    rect(margin, margin, width - margin*2, height - margin - bottomMargin);
}

function drawHUD() {
    let ty = height - bottomMargin + 45; 
    
    let y = year(); let mo = nf(month(), 2); let d = nf(day(), 2);
    let h = nf(hour(), 2); let m = nf(minute(), 2); let s = nf(second(), 2);

    // ==========================================
    // 1. GAUCHE
    // ==========================================
    textAlign(LEFT, TOP); textFont('Helvetica'); textStyle(NORMAL); 
    
    textSize(10); fill(130);
    text("EXHIBITION: 1-54 CONTEMPORARY AFRICAN ART FAIR (MARRAKESH)", margin, ty);
    
    textSize(11); fill(colors.ultramarine);
    text(`SYS.TIME: ${y}-${mo}-${d} [${h}:${m}:${s}]`, margin, ty + 16);
    
    textSize(10); fill(150);
    // Info modifiée pour Marrakech
    text(`MARRAKESH API: TEMP ${temp}°C | HUMIDITY ${humidity}% | WIND ${wind}m/s`, margin, ty + 32);

    // ==========================================
    // 2. CENTRE : TITRE & LÉGENDE
    // ==========================================
    textAlign(CENTER, TOP);
    
    textSize(16); fill(colors.ink);
    text("DATA RUG PROTOCOL // 1-54 EDITION", width/2, ty);
    
    textSize(9); fill(150);
    let legY = ty + 24;
    text("GENERATIVE PALETTE MATRIX", width/2, legY);
    
    let swatchW = 90;
    let startX = width/2 - (swatchW * 1.5);
    
    rectMode(CORNER);
    // Crimson (Ajusté pour > 30°C)
    fill(colors.crimson); rect(startX, legY + 14, 8, 8);
    fill(130); textAlign(LEFT, TOP); text("> 30°C (Warm)", startX + 14, legY + 13);
    // Cadmium / Mix (Ajusté pour 20-30°C)
    fill(colors.cadmium); rect(startX + swatchW, legY + 14, 8, 8);
    fill(130); text("20-30°C (Mild)", startX + swatchW + 14, legY + 13);
    // Ultramarine (Ajusté pour < 20°C)
    fill(colors.ultramarine); rect(startX + swatchW*2.2, legY + 14, 8, 8);
    fill(130); text("< 20°C (Cool)", startX + swatchW*2.2 + 14, legY + 13);

    // ==========================================
    // 3. DROITE
    // ==========================================
    textAlign(RIGHT, TOP); 
    textSize(11); fill(colors.ink);
    text(`ALGORITHMIC WEAVE: ACTIVE`, width - margin, ty);
    
    textSize(10); fill(150);
    let currentLine = floor((weaveCursor % (cols * rows)) / cols);
    text(`GENERATION PHASE: ${currentLine + 1}/${rows}`, width - margin, ty + 16);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    let drawW = width - margin * 2;
    let drawH = height - margin - bottomMargin;
    cellW = drawW / cols;
    cellH = drawH / rows;
}