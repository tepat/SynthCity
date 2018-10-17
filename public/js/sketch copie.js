let button;
var monoSynth;
var osc, envelope, fft;

var scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
var note = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  // setup a button (requires p5.dom library, see index.html)
  button = createButton('SAN FRANCISCO THEME');
  button.position(60, 90);
  button.id('data-btn');
  button.mousePressed(getSFData);

  // setup a button (requires p5.dom library, see index.html)
  button = createButton('PARIS THEME');
  button.position(60, 150);
  button.id('data-btn');
  button.mousePressed(getParisData);

  textAlign(CENTER);


  osc = new p5.SinOsc();

  // Instantiate the envelope
  envelope = new p5.Env();

  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);

  // set attackLevel, releaseLevel
  envelope.setRange(1, 0);

  osc.start();

  fft = new p5.FFT();
  noStroke();
}





// --------------------------------------------------------
function getFilms() {
  httpGet('/getFilmData', function(response) {
    console.log(JSON.parse(response));
  });
}

// --------------------------------------------------------
function getParisData() {  



    // time from now (in seconds)
    var time = 0;
    // note duration (in seconds)
    var dur = 1/6;
    // note velocity (volume, from 0 to 1)
    var v = random();
  
    monoSynth.play("Fb3", v, 0, dur);
    monoSynth.play("Gb3", v, time += dur, dur);
  
    background(random(255), random(255), 255);
    text('click to play', width/2, height/2);
  



}




// --------------------------------------------------------
function draw() {
  background(243, 214, 255);
}