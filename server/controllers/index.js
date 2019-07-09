const _ = require('lodash');
const { getCatsFromJSON, updateScores, getScores } = require('../store/index');

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

const getCatsScores = async (req, res) => {
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
};

const winRateCalcul = (points, matchs) => {
  return Math.round((points / matchs) * 100);
};

module.exports = { getCats, getCatsWithLimit, updateCatsScores, getCatsScores };
