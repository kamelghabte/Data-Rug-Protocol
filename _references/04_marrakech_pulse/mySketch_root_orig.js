// TITRE : DATA RUG [MARRAKECH_PULSE]
// ARTISTE : KAMEL GHABTE
// LIEU : ESAV MARRAKECH
// DATA : REAL-TIME WEATHER (MARRAKECH, MA)

let apiKey = "2f05fef27241392f92f3b94a0d889ff0"; 
let city = "Marrakech,MA"; 
let temp = 0, humidity = 0, description = "FETCHING...";

let loomGrid = [];
let cols = 22; 
let rows = 30;
let cellW, cellH;
let weaveCursor = 0; 

let margin = 80;
let bottomHeight = 260; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadJSON(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`, (d) => {
    temp = d.main.temp;
    humidity = d.main.humidity;
    description = d.weather[0].description.toUpperCase();
  });
  initLoom();
}

function initLoom() {
  cellW = (width - margin * 2) / cols;
  cellH = (height - margin - bottomHeight) / rows;
  loomGrid = [];
  for(let i=0; i<cols*rows; i++) {
    loomGrid.push({ type: 0, col: '#151515', active: false });
  }
}

function draw() {
  background(10); 

  if (frameCount % 4 === 0) weaveStep();

  push();
  translate(margin, margin);
  for(let i=0; i<loomGrid.length; i++) {
    let r = floor(i / cols);
    let c = i % cols;
    let cell = loomGrid[i];
    if(cell.active) {
      drawBerberIcon(c * cellW, r * cellH, cellW, cellH, cell.type, cell.col, 2);
    } else {
      stroke(30); strokeWeight(0.5);
      line(c * cellW + cellW/2, r * cellH, c * cellW + cellW/2, r * cellH + cellH);
    }
  }
  pop();

  drawMuseumLabels();
}

function weaveStep() {
  let index = weaveCursor % (cols * rows);
  if(index === 0 && weaveCursor > 0) {
    for(let cell of loomGrid) cell.active = false;
  }
  
  let palette = ['#D35400', '#2243B6', '#E67E22', '#FDFEFE', '#1B2631'];
  loomGrid[index].col = random(palette);
  loomGrid[index].type = floor(random(0, 5));
  loomGrid[index].active = true;
  weaveCursor++;
}

function drawBerberIcon(x, y, w, h, type, col, weight) {
  push();
  translate(x + w/2, y + h/2);
  stroke(col); noFill(); strokeWeight(weight);
  let s = w * 0.7;

  if (type === 0) { // YAZ
    line(-s/4, -s/2, -s/4, s/2); line(s/4, -s/2, s/4, s/2); line(-s/2, 0, s/2, 0);
  } else if (type === 1) { // PEIGNE
    line(-s/2, -s/4, s/2, -s/4);
    for(let i=-s/2; i<=s/2; i+=s/4) line(i, -s/4, i, s/4);
  } else if (type === 2) { // OEIL
    beginShape();
    vertex(-s/2, 0); bezierVertex(-s/4, -s/3, s/4, -s/3, s/2, 0);
    vertex(s/2, 0); bezierVertex(s/4, s/3, -s/4, s/3, -s/2, 0);
    endShape(CLOSE);
    fill(col); ellipse(0, 0, s/5, s/5);
  } else if (type === 3) { // LOSANGE
    rectMode(CENTER); rotate(QUARTER_PI);
    rect(0, 0, s/1.5, s/1.5); rect(0, 0, s/3, s/3);
  } else { // CROIX
    line(-s/2, 0, s/2, 0); line(0, -s/2, 0, s/2);
    line(-s/4, -s/4, s/4, s/4); line(s/4, -s/4, -s/4, s/4);
  }
  pop();
}

function drawMuseumLabels() {
  let y = height - bottomHeight + 70;
  let dateStr = day() + "/" + month() + "/" + year();
  let timeStr = nf(hour(), 2) + ":" + nf(minute(), 2) + ":" + nf(second(), 2);

  fill(255); textAlign(LEFT); textFont('Helvetica');
  
  // INFOS ARTISTE ET TEMPS
  textSize(22); textStyle(BOLD);
  text("DATA RUG [MARRAKECH_ESAV_PULSE]", margin, y);
  
  textSize(16); textStyle(NORMAL);
  fill(200);
  text("ARTIST : KAMEL GHABTE", margin, y + 30);
  
  fill(100); textSize(11);
  text("ESTABLISHMENT : ESAV MARRAKECH // MEDIA LAB", margin, y + 55);
  fill('#E30613');
  text("DATE : " + dateStr + "  |  TIME : " + timeStr, margin, y + 75);

  // LÉGENDE AVEC LOGOS (DATADEX)
  let legX = width / 2 - 50;
  fill(255); textSize(10); textStyle(BOLD);
  text("BERBER SYMBOLOGY LEGEND", legX, y);
  
  let names = ["YAZ (FREE)", "COMB (WORLD)", "EYE (PROTECT)", "DIAMOND (SOUL)", "CROSS (SOUTH)"];
  for(let i=0; i<5; i++) {
    // Dessin du mini-logo
    drawBerberIcon(legX - 25, y + 15 + (i*25), 20, 20, i, 150, 1);
    // Texte de la légende
    fill(150); textStyle(NORMAL);
    text(names[i], legX + 10, y + 30 + (i*25));
  }

  // STATUS LIVE
  textAlign(RIGHT);
  fill('#E30613'); textStyle(BOLD);
  text("● LIVE API CONNECTION", width - margin, y);
  fill(255); textStyle(NORMAL);
  text(`SOURCE: OPENWEATHER / MARRAKECH`, width - margin, y + 25);
  text(`TEMP: ${temp}°C | HUMIDITY: ${humidity}%`, width - margin, y + 42);
  fill(100);
  text(`SYSTEM_STATUS: ${description}`, width - margin, y + 58);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initLoom();
}