// TITRE : DATA RUG [Linz_Eco_Monitor]
// FORMAT : GENERATIVE API INSTALLATION
// ARTIST : KAMEL GHABTE
// DATA : REAL-TIME WEATHER (LINZ, AT)

// API SETUP
let apiKey = "2f05fef27241392f92f3b94a0d889ff0"; 
let city = "Linz,AT"; 
let weatherData = null;

// Variables Météo
let temp = 10; 
let humidity = 60;
let wind = 3;
let description = "EXTRACTING DATA...";

// Grille de Tissage
let loomGrid = [];
let cols = 20; 
let rows = 28;
let cellW, cellH;
let weaveCursor = 0; 

// Marges du cadre de musée
let margin = 60;
let bottomMargin = 220; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  // Appel API
  loadJSON(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`, gotWeather);
  
  let drawW = width - margin * 2;
  let drawH = height - margin - bottomMargin;
  cellW = drawW / cols;
  cellH = drawH / rows;
  
  for(let i=0; i<cols*rows; i++) {
      loomGrid.push({ type: 0, col: '#0F0F0F', active: false });
  }
}

function gotWeather(data) {
  weatherData = data;
  temp = data.main.temp;
  humidity = data.main.humidity;
  wind = data.wind.speed;
  description = data.weather[0].description.toUpperCase();
}

function draw() {
  background(10); 

  // Contrôle de vitesse basé sur le vent
  let speedControl = floor(map(wind, 0, 30, 15, 2)); 
  if (speedControl < 1) speedControl = 1;
  
  if (frameCount % speedControl === 0) {
      autoExtract();
  }

  // --- ZONE D'ART (LE DATA RUG) ---
  push();
  translate(margin, margin);
  
  for(let r=0; r<rows; r++) {
      for(let c=0; c<cols; c++) {
          let index = c + r * cols;
          let cell = loomGrid[index];
          let x = c * cellW;
          let y = r * cellH;
          
          if(cell.active) {
              drawVPSMotif(x, y, cellW, cellH, cell.type, cell.col);
          } else {
              stroke(40); strokeWeight(1);
              drawingContext.setLineDash([2, 4]); 
              line(x + cellW/2, y, x + cellW/2, y + cellH);
              line(x, y + cellH/2, x + cellW, y + cellH/2);
              drawingContext.setLineDash([]);
              noStroke();
          }
      }
  }
  pop();

  // --- HABILLAGE MUSÉE & LÉGENDE ---
  drawMuseumFrame();
  drawLinzStats();
  drawLegend(); 
}

function extractAndWeave(velocity) {
    let index = weaveCursor % (cols * rows);
    
    // EXPORTATION PNG LORSQUE LE TAPIS EST FINI
    if(index === 0 && weaveCursor > 0) {
        let dayStr = day() + "-" + month() + "-" + year();
        let timeStr = nf(hour(), 2) + "h" + nf(minute(), 2);
        
        // Format demandé : Lieu_Date_Heure_KamelGhabte
        let fileName = `DataRug_Linz_${dayStr}_${timeStr}_KamelGhabte`;
        
        saveCanvas(fileName, "png");
        
        // Nettoyage pour nouveau cycle
        for(let i=0; i<loomGrid.length; i++) loomGrid[i].active = false;
    }

    let complexity = map(humidity, 0, 100, 0, 5);
    let type = floor(random(complexity)); 
    
    let col = (temp < 15) ? 
        random(['#0066CC', '#FFFFFF', '#0F0F0F']) : 
        random(['#E30613', '#FFB300', '#0F0F0F']);
    
    if(velocity > 90) col = '#FFFFFF';

    loomGrid[index].type = type;
    loomGrid[index].col = col;
    loomGrid[index].active = true;
    
    weaveCursor++;
}

function autoExtract() {
    extractAndWeave(random(50, 95));
}

function drawVPSMotif(x, y, w, h, type, col) {
    fill(col); noStroke();
    if (type === 0) rect(x, y, w, h);
    else if (type === 1) { 
        let racks = 4; let rw = w/racks;
        for(let i=0; i<racks; i+=2) rect(x+i*rw, y, rw, h);
    } 
    else if (type === 2) { 
        rect(x + w/4, y, w/2, h);
        rect(x, y + h/4, w, h/2);
    } 
    else if (type === 3) {
        quad(x+w/2, y, x+w, y+h/2, x+w/2, y+h, x, y+h/2);
    }
    else {
        rect(x, y, w/2, h/2); rect(x+w/2, y+h/2, w/2, h/2);
        fill('#E30613'); rect(x+w/4, y+h/4, w/2, h/2);
    }
}

function drawMuseumFrame() {
    fill(10); noStroke();
    rect(0, 0, width, margin);
    rect(0, height - bottomMargin, width, bottomMargin);
    rect(0, margin, margin, height - margin - bottomMargin);
    rect(width - margin, margin, width-margin, height - margin - bottomMargin); 
    
    noFill(); stroke(80); strokeWeight(1);
    rect(margin, margin, width - margin*2, height - margin - bottomMargin);
    
    // SIGNATURE VISUELLE
    fill(100); noStroke(); textAlign(RIGHT, BOTTOM);
    textSize(12); textFont('Courier New');
    text("ARTIST: KAMEL GHABTE", width - margin, height - 20);
}

function drawLinzStats() {
    fill(255); noStroke(); textAlign(LEFT, TOP);
    let startX = margin;
    let startY = height - bottomMargin + 20;

    textFont('Courier New'); textSize(18); textStyle(BOLD);
    text("DATA_RUG // CSR_ECO_MONITOR", startX, startY);

    // DATE ET HEURE EN TEMPS RÉEL
    textSize(12); fill('#FFB300');
    let timestamp = day() + "/" + month() + "/" + year() + " -- " + nf(hour(), 2) + ":" + nf(minute(), 2) + ":" + nf(second(), 2);
    text(timestamp, startX, startY + 25);

    textSize(11); textStyle(NORMAL); fill(180);
    text("TARGET: ARS ELECTRONICA (LINZ, AT)", startX, startY + 45);
    
    fill('#0066CC'); 
    text(`TEMP: ${temp}°C | HUMIDITY: ${humidity}%`, startX, startY + 65);
    text(`WIND: ${wind} m/s | STATUS: ${description}`, startX, startY + 80);
    
    fill('#FFB300');
    textAlign(RIGHT, TOP);
    text("SYSTEM STATUS:", width - margin, startY + 25);
    fill(255);
    text("> GENERATIVE_ALGO.js (Active)", width - margin, startY + 45);
    text("> FOOTPRINT_WEAVER (Monitoring...)", width - margin, startY + 60);
}

function drawLegend() {
    let startX = margin + 380; 
    let startY = height - bottomMargin + 25;
    textAlign(LEFT, TOP); textFont('Courier New'); textSize(10);
    
    fill(80); text("--- DATADEX : MORPHOLOGY & COLORS ---", startX, startY);
    
    // Couleurs
    fill('#0066CC'); rect(startX, startY + 20, 10, 10);
    fill(150); text("COLD", startX + 15, startY + 20);
    fill('#E30613'); rect(startX + 60, startY + 20, 10, 10);
    fill(150); text("WARM", startX + 75, startY + 20);
    fill('#FFFFFF'); rect(startX + 120, startY + 20, 10, 10);
    fill(150); text("ANOMALY", startX + 135, startY + 20);

    // Motifs
    let yMotif = startY + 45;
    let iconSize = 12;
    drawVPSMotif(startX, yMotif, iconSize, iconSize, 0, '#444');
    fill(150); text("0.RAW", startX + 15, yMotif + 2);
    drawVPSMotif(startX + 70, yMotif, iconSize, iconSize, 1, '#444');
    text("1.RACK", startX + 85, yMotif + 2);
    drawVPSMotif(startX + 140, yMotif, iconSize, iconSize, 2, '#444');
    text("2.NODE", startX + 155, yMotif + 2);
    drawVPSMotif(startX + 210, yMotif, iconSize, iconSize, 3, '#444');
    text("3.CORE", startX + 225, yMotif + 2);
    drawVPSMotif(startX + 280, yMotif, iconSize, iconSize, 4, '#444');
    text("4.WARN", startX + 295, yMotif + 2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    cellW = (width - margin * 2) / cols;
    cellH = (height - margin - bottomMargin) / rows;
}