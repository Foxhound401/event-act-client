import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import colors from '../utils/colors'
import '../utils/statusMonitor'
import UserInput from '../components/UserInput'
import ChatList from '../components/ChatList'
import { listenUserAuth } from '../firebase/auth'
import { msgSetup } from '../firebase/chat'
import LoginModal from '../components/LoginModal'

const ChatRoom = ({ classes }) => {
  const [user, setUser] = useState(null)
  const [openNameModal, setOpenNameModal] = useState(false)
  useEffect(
    () =>
      listenUserAuth(u => {
        if (u) {
          setUser(u)
          setOpenNameModal(false)
          msgSetup()
        } else {
          setUser(null)
          setOpenNameModal(true)
        }
      }),
    []
  )
  return (
    <Grid container direction="column" className={classes.gridContainer}>
      <Grid className={classes.chatContentContainer} item xs={12}>
        {user ? <ChatList /> : false}
      </Grid>
      <Grid className={classes.inputContainer} item xs={12}>
        {user ? <UserInput /> : false}
      </Grid>
      <LoginModal open={openNameModal} />
    </Grid>
  )
}

const styles = () => ({
  gridContainer: {
    height: '100vh',
  },
  chatContentContainer: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.whiteLilac,
    minHeight: 100,
  },
  inputContainer: {
    display: 'flex',
    height: '50px',
    flexBasis: 'unset',
    backgroundColor: colors.geyser,
    borderTop: colors.manatee + ' solid 2px',
  },
})

export default withStyles(styles)(ChatRoom)
