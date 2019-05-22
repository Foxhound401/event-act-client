import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { listenMsg } from '../firebase/chat'

class ChatList extends Component {
  state = {
    chatMessages: [],
  }

  componentDidMount() {
    listenMsg(mergedMsgs => {
      if (mergedMsgs.length > 0) {
        this.setState(
          {
            chatMessages: mergedMsgs,
          },
          () => {
            const elem = document.getElementById('chat-rows')
            const { getForceScroll, setForceScroll } = this.props
            if (
              getForceScroll() ||
              elem.scrollHeight - elem.clientHeight - elem.scrollTop < 350
            ) {
              if (getForceScroll()) setForceScroll(false)
              elem.scrollTop = elem.scrollHeight
            }
          }
        )
      }
    })
  }

  render() {
    const { chatMessages } = this.state
    const { classes } = this.props
    return (
      <div id="chat-rows" className={classes.chatRowWrapper}>
        <List dense>
          {chatMessages.map((item, index) => (
            <ListItem
              className={classes.chatItem}
              key={index + '-' + (item.key || item.time)}
            >
              {item.user ? (
                <ListItemText
                  classes={{
                    root: classes.chatTextRootName,
                    primary: classes.chatText,
                  }}
                  primary={item.user}
                  // secondary={'Secondary text'}
                />
              ) : (
                false
              )}
              <ListItemText
                classes={{
                  root: classes.chatTextRoot,
                  primary: classes.chatText,
                }}
                // primary="Single-line item"
                secondary={item.msg}
              />
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

const styles = () => ({
  chatRowWrapper: { width: '100%', height: '100%', overflow: 'scroll' },
  chatText: {
    fontWeight: 'bold',
  },
  chatTextRoot: {
    padding: '0px 5px',
  },
  chatTextRootName: {
    flexShrink: 0,
    flexGrow: 0,
    padding: '0px 5px',
  },
  chatItem: {
    paddingTop: '4px',
    paddingBottom: '4px',
  },
})

export default withStyles(styles)(ChatList)
