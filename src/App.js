import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './utils/statusMonitor'
import Loading from './components/Loading'
import './App.css'

const withSuspense = Component => {
  return props => (
    <React.Suspense fallback={Loading}>
      <Component {...props} />
    </React.Suspense>
  )
}
const ChatRoom = withSuspense(React.lazy(() => import('./pages/ChatRoom')))

const App = ({ classes }) => {
  return (
    <div className={classes.container}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/chat">
            <ChatRoom />
          </Route>
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
