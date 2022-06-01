import React from "react";
import Home from "./screens/Home";
import MainPage from "./screens/MainPage";
import NewsPage from "./screens/NewsPage";
import ReservationPage from "./screens/ReservationPage";
import OverviewPage from "./screens/OverviewPage";
import ConfirmationPage from "./screens/ConfirmationPage";
import ProfilePage from "./screens/ProfilePage";
import CreateAccount from "./screens/CreateAccount";
import SignInPage from "./screens/SignInPage";
import ClubMain from "./screens/ClubMain";
import CreateClubAccount from "./screens/CreateAClubAccount";
import ClubSignIn from "./screens/SiginInAsAClub";
import Dashboard from "./screens/Dashboard";
import CalendarScreen from "./screens/Calendar";
import EditCalendar from "./screens/EditCalendar";
import ClubProfile from "./screens/ClubProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// IMPORT REDUX //
// import { createStore, combineReducers } from "redux";
// import { Provider } from "react-redux";
// import token from "./reducer/token";
// import currentReservation from "./reducer/currentReservation";
// const store = createStore(combineReducers({ token, currentReservation }));

function App() {
  return (
    // <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/games" component={MainPage} />
        <Route path="/news" component={NewsPage} />
        <Route path="/reservation/overview" component={OverviewPage} />
        <Route path="/reservation/confirmation" component={ConfirmationPage} />
        <Route path="/reservation" component={ReservationPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/signup" component={CreateAccount} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/club/signup" component={CreateClubAccount} />
        <Route path="/club/signin" component={ClubSignIn} />
        <Route path="/club/dashboard" component={Dashboard} />
        <Route path="/club/calendar/edit" component={EditCalendar} />
        <Route path="/club/calendar" component={CalendarScreen} />
        <Route path="/club/profile" component={ClubProfile} />
        <Route path="/club" component={ClubMain} />
        <Route path="*" component={Home} />
      </Switch>
    </Router>
    // </Provider>
  );
}

export default App;
