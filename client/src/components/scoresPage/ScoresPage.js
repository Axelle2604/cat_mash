import React, { Component, Fragment } from 'react';
import CatScore from './CatScore';
import { getCatsScores } from '../../services/cats';
import {
  Container,
  ContainerScores,
  Header,
  ContainerRows,
  Loader,
} from './style/scorePageStyled';

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
    const loader = isLoading && (
      <Loader>
        <i class="fas fa-spinner" />
      </Loader>
    );
    const scoresList = !isLoading && (
      <Fragment>
        <Header>
          <div>Scores</div>
          <i class="fas fa-times" onClick={closeScoresWindow} />
        </Header>
        <ContainerRows>
          {scores.map(({ points, catId, winRate, imgUrl }) => (
            <CatScore
              points={points}
              key={catId}
              winRate={winRate}
              imgUrl={imgUrl}
            />
          ))}
          <div>
            <button onClick={this.fetchCatsScores}>Show more</button>
          </div>
        </ContainerRows>
      </Fragment>
    );
    return (
      <Container>
        <ContainerScores>{loader || scoresList}</ContainerScores>
      </Container>
    );
  }
}
