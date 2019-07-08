const express = require('express');
const route = express.Router();
const { getCats, getCatsWithLimit } = require('../controllers');

route.get('/cats?:limit', getCatsWithLimit);
route.get('/cats', getCats);

module.exports = route;
