const fs = require('fs');

function logger(log) {
  fs.writeFile('./log', log, function (err) {
    if (err) return console.log(err);
  });
}