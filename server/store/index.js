const axios = require('axios');

const BASE_URL = 'https://latelier.co/data/cats.json';

const getCatsFromJSON = async () => {
  const {
    data: { images: cats },
  } = await axios.get(BASE_URL);
  return cats;
};

module.exports = { getCatsFromJSON };
