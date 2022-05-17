import React from 'react';
import Home from './screens/Home'
import MainPage from './screens/MainPage'
import CreateAccount from './screens/CreateAccount'
import LoginPage from './screens/LoginPage'

import { BrowserRouter as Router, Switch, Route}  from 'react-router-dom';



function App() {
  return (
    <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/home' component={MainPage} />
          <Route path='/signup' component={CreateAccount} />
          <Route path='/login' component={LoginPage} />
        </Switch>
    </Router>
  );
}

export default App;
