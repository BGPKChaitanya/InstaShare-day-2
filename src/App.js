import {BrowserRouter, Switch, Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/users/:userId" component={UserProfile} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
