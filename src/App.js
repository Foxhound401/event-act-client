import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Loading from './components/Loading'
import PrivateRoute from './components/PrivateRoute'
import './utils/statusMonitor'
import './App.css'

const withSuspense = Component => {
  return props => (
    <React.Suspense fallback={Loading()}>
      <Component {...props} />
    </React.Suspense>
  )
}
const ChatRoom = withSuspense(React.lazy(() => import('./pages/ChatRoom')))
const Login = withSuspense(React.lazy(() => import('./pages/Login')))

const App = ({ classes }) => {
  return (
    <div className={classes.container}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/chat">
            <ChatRoom />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/dashboard">
            <h5>Dashboard</h5>
          </PrivateRoute>
          <Route path="/">
            <h5>HOME</h5>
            <Link to="/chat">CHat</Link>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

const styles = () => ({})

export default withStyles(styles)(App)
