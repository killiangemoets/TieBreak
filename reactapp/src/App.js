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
          <Route
            path="https://powerful-lake-94672.herokuapp.com/"
            exact
            component={Home}
          />
          <Route
            path="https://powerful-lake-94672.herokuapp.com/games"
            component={MainPage}
          />
          <Route
            path="https://powerful-lake-94672.herokuapp.com/news"
            component={NewsPage}
          />
          <Route
            path="https://powerful-lake-94672.herokuapp.com/reservation/overview"
            component={OverviewPage}
          />
          <Route
            path="https://powerful-lake-94672.herokuapp.com/reservation/confirmation"
            component={ConfirmationPage}
          />
          <Route
            path="https://powerful-lake-94672.herokuapp.com/reservation"
            component={ReservationPage}
          />
          <Route
            path="https://powerful-lake-94672.herokuapp.com/profile"
            component={ProfilePage}
          />
          <Route
            path="https://powerful-lake-94672.herokuapp.com/signup"
            component={CreateAccount}
          />
          <Route
            path="https://powerful-lake-94672.herokuapp.com/signin"
            component={SignInPage}
          />
          <Route
            path="https://powerful-lake-94672.herokuapp.com/club/signup"
            component={CreateClubAccount}
          />
          <Route
            path="https://powerful-lake-94672.herokuapp.com/club/signin"
            component={ClubSignIn}
          />
          <Route
            path="https://powerful-lake-94672.herokuapp.com/club/dashboard"
            component={Dashboard}
          />
          <Route
            path="https://powerful-lake-94672.herokuapp.com/club/calendar/edit"
            component={EditCalendar}
          />
          <Route
            path="https://powerful-lake-94672.herokuapp.com/club/calendar"
            component={CalendarScreen}
          />
          <Route
            path="https://powerful-lake-94672.herokuapp.com/club/profile"
            component={ClubProfile}
          />
          <Route
            path="https://powerful-lake-94672.herokuapp.com/club"
            component={ClubMain}
          />
          <Route path="*" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
