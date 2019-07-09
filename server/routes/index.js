const express = require('express');
const route = express.Router();
const {
  getCats,
  getCatsWithLimit,
  updateCatsScores,
} = require('../controllers');

route.get('/cats?:limit', getCatsWithLimit);
route.get('/cats', getCats);
route.put('/scores', updateCatsScores);

module.exports = route;
