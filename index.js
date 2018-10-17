const express = require('express');
const request = require('request');
const app     = express();
const PORT    = 3000;

// tell our app where to serve our static files
app.use(express.static('public'));

// --------------------------------------------------------
// define a route - what happens when people visit /
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});


// --------------------------------------------------------
// Studio Ghibli API
// https://ghibliapi.herokuapp.com/
app.get('/getHistoricalCity/:city', function(req, res) {
  
  //let openWeatherMapUrl = 'https://samples.openweathermap.org/data/2.5/history/city?id=2885679&type=hour&appid=b1b15e88fa797225412429c1c50c122a1';
  let openWeatherMapUrl
  if(req.params.city == "SF"){
    openWeatherMapUrl = 'https://samples.openweathermap.org/data/2.5/history/accumulated_temperature?id=2988507&threshold=284&start=1505336400&end=1505941200&appid=b1b15e88fa797225412429c1c50c122a1';  
  } else {
    openWeatherMapUrl = 'https://samples.openweathermap.org/data/2.5/history/accumulated_temperature?id=2988507&threshold=284&start=1505336400&end=1505941200&appid=b1b15e88fa797225412429c1c50c122a1';
  }
  
  let options = {
    json: true 
  };

  // make an api request to the ghibli api /films endpoint
  request(openWeatherMapUrl, options, function(error, response, body) {
    
    if (!error && response.statusCode == 200) {
      res.send(body);
      console.log(body);
    } else {
      console.log(error);
    }
  }); 
});


JSONParis = '{  "message": ", tm1=10.551158",  "cod": "200",  "city_id": 2885679,  "calctime": 10.555960039,  "list": [  {  "date": "2017-9-13",  "temp": 288.93,  "count": 1  },  {  "date": "2017-9-14",  "temp": 575.23,  "count": 2  },  { "date": "2017-9-15",  "temp": 859.29,  "count": 3  },  {  "date": "2017-9-16",  "temp": 1143.56,  "count": 4  },  {  "date": "2017-9-17",  "temp": 1143.56,  "count": 4  },  {  "date": "2017-9-18",  "temp": 1143.56,  "count": 4  },  {  "date": "2017-9-19",  "temp": 1143.56,  "count": 4  },  {  "date": "2017-9-20",  "temp": 1143.56,  "count": 4  }  ]  }';
JSONSF = '{  "message": ", tm1=10.551158",  "cod": "200",  "city_id": 2885679,  "calctime": 10.555960039,  "list": [  {  "date": "2017-9-13",  "temp": 295.93,  "count": 1  },  {  "date": "2017-9-14",  "temp": 520.23,  "count": 2  },  { "date": "2017-9-15",  "temp": 750.29,  "count": 3  },  {  "date": "2017-9-16",  "temp": 1222.56,  "count": 4  },  {  "date": "2017-9-17",  "temp": 900.56,  "count": 4  },  {  "date": "2017-9-18",  "temp": 1100.56,  "count": 4  },  {  "date": "2017-9-19",  "temp": 1000.56,  "count": 4  },  {  "date": "2017-9-20",  "temp": 1200.56,  "count": 4  }  ]  }';






// --------------------------------------------------------
// Studio Ghibli API
// https://ghibliapi.herokuapp.com/
app.get('/getFilmData', function(req, res) {
  
  let ghibliFilmsUrl = 'https://ghibliapi.herokuapp.com/films';
  let options = {
    json: true 
  };

  // make an api request to the ghibli api /films endpoint
  request(ghibliFilmsUrl, options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.err(error);
    }
  }); 
});

// --------------------------------------------------------
// Genderize.io
app.get('/checkName/:name', function(req, res) {
  let url = "https://api.genderize.io/?name=" + req.params.name;
  let options = {
    json: true
  };

  request(url, options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.err(error);
    }
  });
})

// --------------------------------------------------------
// Amiibo API
// http://www.amiiboapi.com/
app.get('/getAmiiboData', function(req, res) {
  let url = "http://www.amiiboapi.com/api/amiibo/?name=mario";
  let options = {
    json: true
  };

  request(url, options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.err(error);
    }
  });
})

// --------------------------------------------------------
// Hello, Salut!
// https://www.fourtonfish.com/hellosalut/hello/
app.get('/getHelloInLang', function(req, res) {
  let url = "https://fourtonfish.com/hellosalut/?lang=dz";
  let options = {
    json: true,
  };

  request(url, options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    } else {
      console.err(error);
    }
  });
})


// --------------------------------------------------------
// tell our app where to listen for connections
app.listen(PORT, function() {
  console.log('listening on PORT: ' + PORT);
});