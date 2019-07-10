const store = require('../store/index');
const _ = require('lodash');
const {
  winRateCalcul,
  getCatsScores,
  updateCatsScores,
  getCatsWithLimit,
} = require('./index');

jest.mock('../store/index');
jest.mock('lodash');

describe('WinRate calcul.', () => {
  test('Should return the winrate.', () => {
    expect(winRateCalcul(5, 10)).toBe(50);
  });
});

describe('GetCatsScores', () => {
  const resSendSpy = jest.fn(function() {
    return this;
  });
  const resStatusSpy = jest.fn();
  const mockGetCatsScores = async () =>
    await getCatsScores(
      { query: { offset: 10, limit: 10 } },
      { send: resSendSpy, status: resStatusSpy }
    );
  const mockGetScores = () =>
    (store.getScores = jest.fn(() => [
      { cat_id: 1, img_url: 'test.jpg', points: 1, nb_matchs: 1 },
    ]));

  test('Should send a cats array.', async () => {
    await mockGetScores();
    await mockGetCatsScores();
    expect(resSendSpy).toHaveBeenCalledWith([
      { catId: 1, imgUrl: 'test.jpg', points: 1, winRate: 100 },
    ]);
  });

  test('Should res.send to have been called.', async () => {
    await mockGetCatsScores();
    expect(resSendSpy).toHaveBeenCalled();
  });

  test('Should send a correct status.', async () => {
    await mockGetScores();
    await mockGetCatsScores();
    expect(resStatusSpy).toHaveBeenCalledWith(200);
  });

  test('Should req.status to have been called.', async () => {
    await mockGetCatsScores();
    expect(resStatusSpy).toHaveBeenCalled();
  });
});

describe('UpdateCatsScores', () => {
  const resSendStatusSpy = jest.fn();

  const mockUpdateCatsScores = async () =>
    await updateCatsScores(
      {
        body: [{ isWon: true, catId: 0 }, { isWon: false, catId: 1 }],
      },
      { sendStatus: resSendStatusSpy }
    );

  test('Should res.status to have been called.', async () => {
    await mockUpdateCatsScores();
    expect(resSendStatusSpy).toHaveBeenCalled();
  });

  test('Should send a correct status.', async () => {
    await mockUpdateCatsScores();
    expect(resSendStatusSpy).toHaveBeenCalledWith(201);
  });
});

describe('GetCatsWithLimit', () => {
  const resSendSpy = jest.fn(function() {
    return this;
  });

  const resStatusSpy = jest.fn();

  const mockGetCatsFromJSON = () =>
    (store.getCatsFromJSON = jest.fn(() => [
      { id: 0, url: 'test0.jpg' },
      { id: 1, url: 'test1.jpg' },
      { id: 2, url: 'test1.jpg' },
    ]));

  const mockGetCatsWithLimit = async () =>
    await getCatsWithLimit(
      {
        query: { limit: 10 },
      },
      { send: resSendSpy, status: resStatusSpy }
    );

  _.shuffle = jest.fn(() => [
    { id: 2, url: 'test1.jpg' },
    { id: 1, url: 'test1.jpg' },
    { id: 0, url: 'test0.jpg' },
  ]);

  test('Should res.status to have been called.', async () => {
    await mockGetCatsFromJSON();
    await mockGetCatsWithLimit();
    expect(resSendSpy).toHaveBeenCalled();
  });

  test('Should return send a cats array.', async () => {
    await mockGetCatsFromJSON();
    await mockGetCatsWithLimit();
    expect(resSendSpy).toHaveBeenCalledWith([
      { id: 2, url: 'test1.jpg' },
      { id: 1, url: 'test1.jpg' },
      { id: 0, url: 'test0.jpg' },
    ]);
  });
});
