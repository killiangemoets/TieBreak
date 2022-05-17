import React from "react";
import Home from "./screens/Home";
import MainPage from "./screens/MainPage";
import NewsPage from "./screens/NewsPage";
import ReservationPage from "./screens/ReservationPage";
import OverviewPage from "./screens/OverviewPage";
import ConfirmationPage from "./screens/ConfirmationPage";
import ProfilePage from "./screens/ProfilePage";

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
      </Switch>
    </Router>
  );
}

export default App;
