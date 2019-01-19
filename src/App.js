import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from './Components/Landing';
import Chat from './Components/Chat';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/chat' component={Chat} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
