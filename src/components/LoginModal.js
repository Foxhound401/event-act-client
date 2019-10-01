import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Fade from '@material-ui/core/Fade'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import colors from '../utils/colors'
import { loginAnon, logout } from '../firebase/auth'
import { setName, checkAvailability } from '../firebase/user'

class App extends Component {
  state = {
    name: '',
    error: null,
    processing: false,
  }

  onUserInputChange = e => {
    this.setState({ name: e.target.value })
  }

  onSubmitName = async () => {
    const { name } = this.state
    if (!name || name.length < 3) {
      return this.setState({
        error: 'Name must be longer than 3 chars',
      })
    }
    this.setState({ processing: true })
    if (await checkAvailability(name)) {
      try {
        await loginAnon()
        await setName(name)
      } catch (e) {
        logout()
        this.setState({
          name: '',
          error: 'Name error, please retry',
          processing: false,
        })
      }
      this.setState({
        name: '',
        error: null,
        processing: false,
      })
    } else {
      this.setState({
        error: 'Name already taken',
        processing: false,
      })
    }
  }

  render() {
    const { classes, open } = this.props
    const { name, error, processing } = this.state
    return (
      <Modal
        aria-labelledby="set-name-title"
        aria-describedby="set-name-description"
        open={open}
        className={classes.modal}
        closeAfterTransition
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="set-name-title">Set your Name</h2>
            <p id="set-name-description">
              Hiya, Look like you're new here! What's your name, dear?
            </p>
            {error ? (
              <h5 style={{ color: colors.wellRead }}>{error}</h5>
            ) : (
              false
            )}
            <div className={classes.nameContainer}>
              <TextField
                disabled={processing}
                autoFocus
                label="Name"
                className={classes.input}
                value={name}
                onChange={this.onUserInputChange}
                margin="normal"
                onSubmit={this.onSubmitName}
              />
              <Button
                disabled={processing}
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.onSubmitName}
              >
                {processing ? 'Getting In' : "Let's Go"}
                {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                <Icon className={classes.rightIcon}>send</Icon>
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    )
  }
}

const styles = () => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: colors.white,
    border: '2px solid #000',
    padding: '10px 25px 20px',
  },
  button: {
    margin: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  nameContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
})

export default withStyles(styles)(App)
