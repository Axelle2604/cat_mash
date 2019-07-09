import React, { Component } from 'react';
import { getCatsWithLimit, updateCatsScores } from '../../services/cats';
import CatContainer from './CatContainer';

const NB_LIMIT = 10;

const setCurrentCats = ({ index, cats }) => ({
  firstCat: cats[index + 1],
  secondCat: cats[index + 2],
  index: index + 2,
});

const updateCats = newCats => ({ cats }) => ({
  cats: [...cats.slice(cats.length - NB_LIMIT / 2), ...newCats],
  index: 0,
});
export default class HomePage extends Component {
  state = {
    cats: [],
    firstCat: {},
    secondCat: {},
    index: 0,
    isLoading: true,
  };

  componentDidMount = () => this.fetchCats();

  fetchCats = async () => {
    const cats = await getCatsWithLimit(NB_LIMIT);
    this.setState({ cats, isLoading: false }, this.selectTwoCats);
  };

  selectTwoCats = () => {
    this.setState(setCurrentCats);
  };

  nextCats = async selectedCat => {
    const { index, cats, firstCat, secondCat } = this.state;
    const isFirstCatWon = selectedCat === 'firstCat' ? true : false;
    const isSecondCatWon = selectedCat === 'secondCat' ? true : false;

    await updateCatsScores([
      { isWon: isFirstCatWon, catId: firstCat.id },
      { isWon: isSecondCatWon, catId: secondCat.id },
    ]);
    if (index >= cats.length - NB_LIMIT / 2) {
      const cats = await getCatsWithLimit(NB_LIMIT);
      this.setState(updateCats(cats));
    }
    this.selectTwoCats();
  };

  render() {
    const { isLoading, firstCat, secondCat } = this.state;
    const CatsContainer = !isLoading && (
      <div>
        <CatContainer
          img={firstCat.url}
          name="firstCat"
          nextCats={this.nextCats}
        />
        <CatContainer
          img={secondCat.url}
          name="secondCat"
          nextCats={this.nextCats}
        />
      </div>
    );
    const Loader = isLoading && <div>LOADING</div>;
    return Loader || CatsContainer;
  }
}
