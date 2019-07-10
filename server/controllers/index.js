const _ = require('lodash');
const CatStore = require('../store/index');

const getCatsWithLimit = async (req, res) => {
  try {
    const limitNumber = req.query.limit;
    const cats = await CatStore.getCatsFromJSON();
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
    CatStore.updateScores(catsScores);
    res.sendStatus(201);
  } catch {
    res.status(500);
  }
};

const getCatsScores = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const scores = await CatStore.getScores(offset, limit);
    const catsScores = scores.map(
      ({ points, nb_matchs: nbMatchs, cat_id: catId, img_url: imgUrl }) => {
        return {
          winRate: points > 0 ? winRateCalcul(points, nbMatchs) : 0,
          points,
          catId,
          imgUrl,
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

module.exports = {
  getCatsWithLimit,
  updateCatsScores,
  getCatsScores,
  winRateCalcul,
};
