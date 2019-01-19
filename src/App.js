import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from './Components/Landing';
import Chat from './Components/Chat';
import Admin from './Components/Admin';
import Login from './Components/Login';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/chat' component={Chat} />
          <Route path='/admin' component={Admin} />
          <Route path='/login' component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
