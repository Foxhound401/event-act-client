import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import Loading from './components/Loading'
import PrivateRoute from './components/PrivateRoute'
import './utils/statusMonitor'
import './App.css'
import './firebase/auth'
import './firebase/lesson'

const withSuspense = Component => {
  return props => (
    <React.Suspense fallback={Loading()}>
      <Component {...props} />
    </React.Suspense>
  )
}
const Lesson = withSuspense(React.lazy(() => import('./pages/Lesson')))
const Main = withSuspense(React.lazy(() => import('./pages/Main')))
const Login = withSuspense(React.lazy(() => import('./pages/Login')))
const Skill = withSuspense(React.lazy(() => import('./pages/Skill')))

const App = ({ classes }) => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/lesson">
            <Lesson />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/skill">
            <Skill />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/reload" component={null} key="reload" />
          {/* <PrivateRoute path="/dashboard">
            <h5>Dashboard</h5>
          </PrivateRoute> */}
          <Route path="/">
            <Redirect
              to={{
                pathname: '/main',
              }}
            />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

const styles = () => ({
  container: {
    width: '100%',
    height: '100%',
  },
})

export default withStyles(styles)(App)
