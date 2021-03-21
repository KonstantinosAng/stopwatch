let hour, min, sec, end, startFlag=false, song, h, m, s, total, max, quit, startDate;
const { app } = require('electron');

function setup() {
  createCanvas(windowWidth, windowHeight-100);
  angleMode(DEGREES);
  frameRate(30);
  h = document.getElementById('hour');
  m = document.getElementById('min');
  s = document.getElementById('sec');
  button = document.getElementById('btn');
  button.addEventListener('click', ()=>{
    hour = h.value===''?0:parseInt(h.value);
    min = m.value===''?0:parseInt(m.value);
    sec = s.value===''?0:parseInt(s.value);
    total = hour*60*60 + min*60 + sec;
    max = hour*60*60 + min*60 + sec;
    startFlag = true;
    startDate = new Date();
  })
  song = loadSound('complete.mp3');
  quit = document.getElementById('quit');
  quit.addEventListener('click', ()=>{
    require('electron').remote.getCurrentWindow().close();
    app.close(0);
  })
}

function playSound() {
  song.play();
  h.value = '';
  m.value = '';
  s.value = '';
}

function draw() {
  background(0);
  strokeWeight(10);
  stroke(255);
  noFill();
  ellipse(windowWidth/2, windowHeight/2-80, 280, 280);
  stroke(255, 150, 0);
  fill(255, 0, 0);
  arc(windowWidth/2, windowHeight/2-80, 280, 280, end-90, -90);
  if (startFlag) {
    total = max - (new Date().getTime() - startDate.getTime()) / 1000;
    end = map(total, 0, max, 360, 0);
    console.log(total);
    if (total <= 0) {
      startFlag = false;    
      playSound();
    }
  } 
}