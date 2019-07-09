import React, { Component } from 'react';
import CatScore from './CatScore';
import { getCatsScores } from '../../services/cats';

const NB_SCORES_TO_ADD = 10;

const addToScores = scoresToAdd => ({ scores, offset, limit }) => ({
  scores: [...scores, ...scoresToAdd],
  isLoading: false,
  offset: offset + NB_SCORES_TO_ADD,
});

export default class ScoresPage extends Component {
  state = {
    isLoading: true,
    scores: [],
    offset: 0,
  };

  componentDidMount = () => this.fetchCatsScores();

  fetchCatsScores = async () => {
    const { offset } = this.state;
    const scores = await getCatsScores(offset, 10);
    this.setState(addToScores(scores));
  };

  render() {
    const { closeScoresWindow } = this.props;
    const { scores, isLoading } = this.state;
    const loader = isLoading && <div>LOADING</div>;
    const scoresList = !isLoading && (
      <div>
        <div>
          <div>Scores</div>
          <button onClick={closeScoresWindow}>Close</button>
        </div>
        {scores.map(({ points, catId, winRate }) => (
          <CatScore points={points} key={catId} winRate={winRate} />
        ))}
        <div>
          <button onClick={this.fetchCatsScores}>Show more</button>
        </div>
      </div>
    );
    return loader || scoresList;
  }
}
