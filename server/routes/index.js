const express = require('express');
const route = express.Router();
const {
  getCats,
  getCatsWithLimit,
  updateCatsScores,
  getCatsScores,
} = require('../controllers');

route.get('/cats?:limit', getCatsWithLimit);
route.get('/cats', getCats);
route.put('/scores', updateCatsScores);
route.get('/scores', getCatsScores);

module.exports = route;
