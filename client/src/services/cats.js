import axios from 'axios';

export const getCats = async () => {
  const { data: cats } = await axios.get(`/api/v1/cats`);
  return cats;
};

export const getCatsWithLimit = async limitNumber => {
  const { data: cats } = await axios.get(`/api/v1/cats?limit=${limitNumber}`);
  return cats;
};

export const updateCatsScores = async catsScores => {
  return await axios.put(`/api/v1/scores`, catsScores);
};
