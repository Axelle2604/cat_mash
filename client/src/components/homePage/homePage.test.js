import { setCurrentCats, updateCats } from './HomePage';

const cats = ['cat1', 'cat2', 'cat3', 'cat4', 'cat5'];

describe('HomePage', () => {
  test('Should set new current cats', () => {
    expect(setCurrentCats({ index: 0, cats })).toEqual({
      firstCat: 'cat2',
      secondCat: 'cat3',
      index: 2,
    });
  });

  test('Should update cats array', () => {
    expect(updateCats(['cat6', 'cat7'])({ cats })).toEqual({
      cats: ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7'],
      index: 0,
    });
  });
});
