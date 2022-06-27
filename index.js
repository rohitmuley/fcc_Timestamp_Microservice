// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

const port = process.env.PORT || 8000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/:date?", (request, response) => {
  // If date not in correct format
  if (!Date.parse(request.params.date) && !Number(request.params.date)) {
    return response.send({
      error: "Invalid Date"
    });
  }

  else if ((/[0-9]/.test(request.params.date)) && Number(request.params.date)) {

    let date = new Date(Number(request.params.date));

    let result = {
      unix: date.getTime(),
      utc: date.toUTCString()
    }

    return response.status(200).send(result);
  }

  let date = new Date(request.params.date);

  let result = {
    unix: date.getTime(),
    utc: date.toUTCString()
  }

  return response.status(200).send(result);
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});




// listen for requests :)
var listener = app.listen(port/*process.env.PORT*/, function () {
  console.log('Your app is listening on port ' + port /*listener.address().port*/);
});
