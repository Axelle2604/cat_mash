const axios = require('axios');
const { Pool } = require('pg');
const connectionString = process.env.CONNECTION_STRING;

const pool = new Pool({
  connectionString: connectionString + '?ssl=true',
});

const BASE_URL = 'https://latelier.co/data/cats.json';

const getCatsFromJSON = async () => {
  const {
    data: { images: cats },
  } = await axios.get(BASE_URL);
  return cats;
};

const updateScores = async catsScores => {
  try {
    return catsScores.map(({ isWon, catId }) => {
      if (isWon) {
        return pool.query(
          `UPDATE scores SET nb_matchs = nb_matchs+1, points = points+1 WHERE cat_id = '${catId}'`
        );
      }
      return pool.query(
        `UPDATE scores SET nb_matchs = nb_matchs+1 WHERE cat_id = '${catId}'`
      );
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = { getCatsFromJSON, updateScores };
