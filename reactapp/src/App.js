import React from "react";
import Home from "./screens/Home";
import MainPage from "./screens/MainPage";
import NewsPage from "./screens/NewsPage";
import ATPRankingsPage from "./screens/ATPRankingsPage";
import WTARankingsPage from "./screens/WTARankingsPage";
import ReservationPage from "./screens/ReservationPage";
import OverviewPage from "./screens/OverviewPage";
import ConfirmationPage from "./screens/ConfirmationPage";
import ProfilePage from "./screens/ProfilePage";
import CreateAccount from "./screens/CreateAccount";
import SignInPage from "./screens/SignInPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// IMPORT REDUX //
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import token from "./reducer/token";
import currentReservation from "./reducer/currentReservation";

const store = createStore(combineReducers({ token, currentReservation }));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/games" component={MainPage} />
          <Route path="/news/atprankings" component={ATPRankingsPage} />
          <Route path="/news/wtarankings" component={WTARankingsPage} />
          <Route path="/news" component={NewsPage} />
          <Route path="/reservation/overview" component={OverviewPage} />
          <Route
            path="/reservation/confirmation"
            component={ConfirmationPage}
          />
          <Route path="/reservation" component={ReservationPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/signup" component={CreateAccount} />
          <Route path="/signin" component={SignInPage} />
          <Route path="*" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
