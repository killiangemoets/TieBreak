import React from "react";
import Home from "./screens/Home";
import MainPage from "./screens/MainPage";
import NewsPage from "./screens/NewsPage";
import ReservationPage from "./screens/ReservationPage";
import OverviewPage from "./screens/OverviewPage";
import ConfirmationPage from "./screens/ConfirmationPage";
import ProfilePage from "./screens/ProfilePage";
import CreateAccount from './screens/CreateAccount'
import LoginPage from './screens/LoginPage'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/games" component={MainPage} />
        <Route path="/news" component={NewsPage} />
        <Route path="/reservation/overview" component={OverviewPage} />
        <Route path="/reservation/confirmation" component={ConfirmationPage} />
        <Route path="/reservation" component={ReservationPage} />
        <Route path="/profile" component={ProfilePage} />
          <Route path='/signup' component={CreateAccount} />
          <Route path='/login' component={LoginPage} />
        </Switch>
    </Router>
  );
}

export default App;
