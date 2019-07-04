import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/homePage/HomePage';
import ScoresPage from './components/scoresPage/ScoresPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route path="/scores" component={ScoresPage} />
      </Router>
    </div>
  );
}

export default App;
