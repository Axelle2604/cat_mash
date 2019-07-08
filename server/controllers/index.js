const _ = require('lodash');
const { getCatsFromJSON } = require('../store/index');

const getCats = async (req, res) => {
  const cats = await getCatsFromJSON();
  res.send(cats).status(200);
};

const getCatsWithLimit = async (req, res) => {
  const limitNumber = req.query.limit;
  const cats = await getCatsFromJSON();
  const shuffledCats = _.shuffle(cats);
  const someCats = shuffledCats.slice(0, limitNumber);
  res.send(someCats).status(200);
};

module.exports = { getCats, getCatsWithLimit };
