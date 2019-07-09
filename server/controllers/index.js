const _ = require('lodash');
const { getCatsFromJSON, updateScores } = require('../store/index');

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

const updateCatsScores = async (req, res) => {
  const catsScores = req.body;
  updateScores(catsScores);
  res.sendStatus(200);
};

module.exports = { getCats, getCatsWithLimit, updateCatsScores };
