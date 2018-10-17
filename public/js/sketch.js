let TempData = [];
let dataValues = [];
var activateloop = false;

var osc, envelope, fft;

var scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
var note = 0;

var city;

function setup() {
  createCanvas(innerWidth, innerHeight);
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

    // setup a button (requires p5.dom library, see index.html)
    button = createButton('SF TEMPERATURE');
    button.position(100, 90);
    button.id('data-btn');
    button.mousePressed(getSFData);
  
    // setup a button (requires p5.dom library, see index.html)
    button = createButton('PARIS TEMPERATURE');
    button.position(350, 90);
    button.id('data-btn');
    button.mousePressed(getParisData);

    //getTempData("Paris");
}

function getParisData() {  
  activateloop = true;
  dataValues = [60, 62, 64, 64, 68, 69, 71, 72];
  city = "Paris";
}

function getSFData() {  
  activateloop = true;
  dataValues = [70, 72, 75, 75, 79, 78, 76, 50];
  city = "SF";
}


 function getTempData(cityName) {
 	httpGet('/getHistoricalCity/'+cityName, function(response) {
     
     //console.log(JSON.parse(response));
     TempData = JSON.parse(response).list;
     console.log(TempData);
     
     for(var i=0;i<8;i++){
      dataValues.push(TempData[i].temp);
     }
     console.log(dataValues);
     activateloop = true;
 	})
 }


function draw() {
  background(20);
  
  if( activateloop ) {

    if (frameCount % 30 == 0 || frameCount == 1) {
      var midiValue = dataValues[note];
      var freqValue = midiToFreq(midiValue);
      osc.freq(freqValue);

      envelope.play(osc, 0, 0.1);
      note = (note + 1) % dataValues.length;
    }

    // plot FFT.analyze() frequency analysis on the canvas
    var spectrum = fft.analyze();
    for (var i = 0; i < spectrum.length/20; i++) {
      if(city== "Paris"){
        fill(spectrum[i]/100, spectrum[i]/5, 0);
      } else {        
        fill(spectrum[i], spectrum[i]/10, 0);
      }
      
      var x = map(i, 0, spectrum.length/20, 0, width);
      var h = map(spectrum[i], 0, 255, 0, height);
      rect(x, height, spectrum.length/20, -h);
    }
  }
}