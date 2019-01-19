import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from './Components/Landing';
import Chat from './Components/Chat';
import Admin from './Components/Admin';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/chat' component={Chat} />
          <Route path='/admin' component={Admin} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
