import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import MapControl from './MapControl';
import Splash from './Splash';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
    <Switch>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/explore">
        <MapControl />
      </Route>
      <Route path="/">
        <Splash />
      </Route>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
