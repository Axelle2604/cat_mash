import React, { Component } from 'react';
import { getCatsWithLimit } from '../../services/cats';
import CatContainer from './CatContainer';

const NB_LIMIt = 10;

const incrementIndexAndSetCat = cat => ({ index, cats }) => ({
  index: index + 1,
  [cat]: cats[index],
});

export default class HomePage extends Component {
  state = {
    cats: [],
    firstCat: {},
    secondCat: {},
    index: 0,
  };

  componentDidMount = () => this.fetchCats();

  fetchCats = async () => {
    const cats = await getCatsWithLimit(NB_LIMIt);
    this.setState({ cats }, this.getCats);
  };

  getCats = () => {
    this.setState(incrementIndexAndSetCat('firstCat'));
    this.setState(incrementIndexAndSetCat('secondCat'));
  };

  render() {
    const { firstCat, secondCat } = this.state;
    return (
      <div>
        <CatContainer img={firstCat.url} />
        <CatContainer img={secondCat.url} />
      </div>
    );
  }
}
