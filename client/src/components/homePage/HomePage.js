import React, { Component } from 'react';
import { getCatsWithLimit } from '../../services/cats';
import CatContainer from './CatContainer';

const NB_LIMIt = 10;

const incrementIndexAndSetCat = cat => ({ index, cats }) => ({
  index: index + 1,
  [cat]: cats[index],
});

const updateCats = newCats => ({ cats }) => ({
  cats: [...cats.slice(cats.length - 2), ...newCats],
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
    const cats = await getCatsWithLimit(NB_LIMIt);
    this.setState({ cats, isLoading: false }, this.getCats);
  };

  getCats = () => {
    this.setState(incrementIndexAndSetCat('firstCat'));
    this.setState(incrementIndexAndSetCat('secondCat'));
  };

  changeCatsDisplayed = async () => {
    const { index, cats } = this.state;
    if (index === 10) {
      this.setState({ index: 0 });
    }
    if (index >= cats.length - 2) {
      const cats = await getCatsWithLimit(NB_LIMIt);
      this.setState(updateCats(cats));
    }
    this.getCats();
  };

  render() {
    const { isLoading, firstCat, secondCat } = this.state;
    const CatsContainer = !isLoading && (
      <div>
        <CatContainer
          img={firstCat.url}
          changeCatsDisplayed={this.changeCatsDisplayed}
        />
        <CatContainer
          img={secondCat.url}
          changeCatsDisplayed={this.changeCatsDisplayed}
        />
      </div>
    );
    const Loader = isLoading && <div>LOADING</div>;
    return CatsContainer || Loader;
  }
}
