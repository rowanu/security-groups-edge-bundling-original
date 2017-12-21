'use strict';
var extract = require('./extract.js');
var transform = require('./transform.js');

extract()
  .then(transform)
  .then(function (data) {
    console.log(JSON.stringify(data, null, 2));
  });
