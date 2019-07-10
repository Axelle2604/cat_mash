import { addToScores } from './ScoresPage';

describe('ScoresPages', () => {
  test('Should list more scores.', () => {
    expect(addToScores([3, 4])({ scores: [1, 2], offset: 0 })).toEqual({
      scores: [1, 2, 3, 4],
      isLoading: false,
      offset: 10,
    });
  });
});
