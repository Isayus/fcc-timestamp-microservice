// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// --- INICIO DEL CÓDIGO DEL PROYECTO TIMESTAMP ---
// Esta es la ruta principal que tienes que construir

app.get("/api/:date?", (req, res) => {
  const dateString = req.params.date;
  let date;

  // Caso 1: No se proporciona el parámetro de fecha, usamos la fecha actual.
  if (!dateString) {
    date = new Date();
  } else {
    // Caso 2: Se proporciona un parámetro.
    // Comprobamos si es un número (para el timestamp de Unix).
    if (!isNaN(dateString)) {
      // Si es un número, lo convertimos a entero antes de crear la fecha.
      date = new Date(parseInt(dateString));
    } else {
      // Si no es un número, lo tratamos como una cadena de fecha normal.
      date = new Date(dateString);
    }
  }

  // Caso 3: Verificamos si la fecha que hemos creado es válida.
  // El método .toUTCString() de una fecha inválida devuelve "Invalid Date".
  if (date.toUTCString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    // Si la fecha es válida, devolvemos el objeto JSON con el formato correcto.
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// --- FIN DEL CÓDIGO DEL PROYECTO ---


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});