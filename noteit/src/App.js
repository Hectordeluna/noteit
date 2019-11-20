
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Sidebar from "./components/sidebar/Sidebar";
import NoteEdit from "./components/note/NoteEdit";

import "bootstrap/dist/css/bootstrap.min.css";

// SERVICES
import noteService from './services/noteService';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  const [notes, setnotes] = useState(null);

  useEffect(() => {
    if(!notes) {
      getNotes();
    }
  })

  const getNotes = async () => {
    let res = await noteService.getAll();
    setnotes(res);
  }

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar/>
          <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
              <PrivateRoute exact path="/dashboard" component={Sidebar} />
              <PrivateRoute exact path="/note/:id" component={NoteEdit} />
              <PrivateRoute exact path="/note" component={NoteEdit} />
          </Switch>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;