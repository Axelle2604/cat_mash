const express = require('express');
const route = express.Router();
const {
  getCatsWithLimit,
  updateCatsScores,
  getCatsScores,
} = require('../controllers');

route.get('/cats?:limit', getCatsWithLimit);
route.put('/scores', updateCatsScores);
route.get('/scores', getCatsScores);

module.exports = route;
