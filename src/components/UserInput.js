import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { sendMsg } from '../firebase/chat'
import { getName } from '../firebase/user'

class UserInput extends Component {
  state = {
    userInput: '',
  }

  onUserInputChange = e => {
    this.setState({ userInput: e.target.value })
  }

  lastSent = null

  onSubmit = e => {
    e.preventDefault()
    const { userInput } = this.state
    if (userInput && (!this.lastSent || Date.now() - this.lastSent > 400)) {
      this.props.setForceScroll && this.props.setForceScroll(true)
      sendMsg(userInput)
      this.lastSent = Date.now()
      this.setState({
        userInput: '',
      })
    }
    return false
  }

  render() {
    const { userInput } = this.state
    const { classes } = this.props
    return (
      <form className={classes.form} onSubmit={this.onSubmit}>
        <TextField
          autoFocus
          label={getName()}
          className={classes.input}
          value={userInput}
          onChange={this.onUserInputChange}
          margin="normal"
        />
      </form>
    )
  }
}

const styles = () => ({
  form: {
    width: '100%',
    padding: '0px 10px',
  },
  input: {
    width: '100%',
    marginTop: 0,
    marginBottom: 0,
  },
})

export default withStyles(styles)(UserInput)
