
let hour, min, sec, end, startFlag=false, song, h, m, s;

function setup() {
  createCanvas(windowWidth, windowHeight-100);
  angleMode(DEGREES);
  frameRate(1);
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
  })
  song = loadSound('complete.mp3');
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
  ellipse(windowWidth/2, windowHeight/2-50, 280, 280);
  stroke(255, 150, 0);
  fill(255, 0, 0);
  if (startFlag) {
    end = map(total, 0, max, 360, 0);
    arc(windowWidth/2, windowHeight/2-50, 280, 280, end-90, -90);
    total = total - 1;
    if (total === -1) { 
      startFlag = false
      playSound()
    }
  }
}