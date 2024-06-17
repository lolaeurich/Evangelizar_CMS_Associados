// AppRouter.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './src/pages/Home';
import Login from './src/Pages/Login/Login';


function AppRouter() {
  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={Login} /> */}
        {/* <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} /> */}
      </Switch>
    </Router>
  );
}

export default AppRouter;