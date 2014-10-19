var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

// parse application/json
app.use(bodyParser.json());

// serves all the static files
app.use(express.static(__dirname));

var POLL_DB = {
  count: 0
};

// /* serves main page */
app.get('/api/polls/:id', function(req, res) {
  var id = req.params.id;

  var poll = POLL_DB[id];

  res.send(poll);
});

app.post('/api/polls', function(req, res) {
  var poll = req.body;

  var id = POLL_DB.count;
  poll.id = id;

  POLL_DB[id] = poll;
  POLL_DB.count++;

  poll.options = poll.options.filter(function(option) {
    return option.value;
  }).map(function(option) {
    option.count = 0;
    return option;
  });

  console.log(poll);

  res.send(poll);
});


var port = process.env.PORT || 8000;

app.listen(port, function() {
  console.log('Listening on ' + port);
});
