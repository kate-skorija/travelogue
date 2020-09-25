import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import Explore from './Explore';
import Splash from './Splash';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Feature from 'ol/Feature';

function App() {

  const [features, setFeatures] = useState([])

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
        <Explore features={features} />
      </Route>
      <Route path="/">
        <Splash />
      </Route>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
