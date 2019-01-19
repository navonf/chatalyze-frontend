import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from './Landing';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Landing} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
