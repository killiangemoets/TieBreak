import React from 'react';
import Home from './screens/Home'
import MainPage from './screens/MainPage'

import { BrowserRouter as Router, Switch, Route}  from 'react-router-dom';



function App() {
  return (
    <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/home' component={MainPage} />
        </Switch>
    </Router>
  );
}

export default App;
