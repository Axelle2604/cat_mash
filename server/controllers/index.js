const _ = require('lodash');
const { getCatsFromJSON, updateScores, getScores } = require('../store/index');

const getCats = async (req, res) => {
  try {
    const cats = await getCatsFromJSON();
    res.send(cats).status(200);
  } catch {
    res.status(500);
  }
};

const getCatsWithLimit = async (req, res) => {
  try {
    const limitNumber = req.query.limit;
    const cats = await getCatsFromJSON();
    const shuffledCats = _.shuffle(cats);
    const someCats = shuffledCats.slice(0, limitNumber);
    res.send(someCats).status(200);
  } catch {
    res.status(500);
  }
};

const updateCatsScores = async (req, res) => {
  try {
    const catsScores = req.body;
    updateScores(catsScores);
    res.sendStatus(201);
  } catch {
    res.status(500);
  }
};

const getCatsScores = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const scores = await getScores(offset, limit);
    const catsScores = scores.map(
      ({ points, nb_matchs: nbMatchs, cat_id: catId }) => {
        return {
          winRate: points > 0 ? winRateCalcul(points, nbMatchs) : 0,
          points,
          catId,
        };
      }
    );
    res.send(catsScores).status(200);
  } catch {
    res.status(500);
  }
};

const winRateCalcul = (points, matchs) => {
  return Math.round((points / matchs) * 100);
};

module.exports = { getCats, getCatsWithLimit, updateCatsScores, getCatsScores };
