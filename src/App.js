import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import colors from './utils/colors'
import './utils/statusMonitor'
import UserInput from './components/UserInput'
import ChatList from './components/ChatList'

import './App.css'

class App extends Component {
  forceScroll = true

  setForceScroll = val => {
    this.forceScroll = val
  }

  getForceScroll = () => this.forceScroll

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <CssBaseline />
        <Grid container direction="column" className={classes.gridContainer}>
          <Grid className={classes.chatContentContainer} item xs={12}>
            <ChatList
              getForceScroll={this.getForceScroll}
              setForceScroll={this.setForceScroll}
            />
          </Grid>
          <Grid className={classes.inputContainer} item xs={12}>
            <UserInput setForceScroll={this.setForceScroll} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

const styles = () => ({
  gridContainer: {
    height: '100vh',
  },
  chatContentContainer: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.whiteLilac,
  },
  inputContainer: {
    display: 'flex',
    height: '50px',
    flexBasis: 'unset',
    backgroundColor: colors.geyser,
    borderTop: colors.manatee + ' solid 2px',
  },
})

export default withStyles(styles)(App)
