import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ShareIcon from '@material-ui/icons/Share'
import CloseIcon from '@material-ui/icons/Close'
import LessonContext from '../LessonContext'

const styles = {
  container: {
    height: 40,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  progContainer: {
    width: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progWrapper: {
    backgroundColor: 'grey',
    borderRadius: 10,
    height: 10,
    width: '100%',
    overflow: 'hidden',
  },
  prog: {
    height: '100%',
    backgroundColor: 'white',
  },
}

const NavTop = ({ classes }) => {
  const { progress = 0, onExitLesson, onShare } = useContext(LessonContext)

  return (
    <div className={classes.container}>
      <Button onClick={onExitLesson}>
        <CloseIcon />
      </Button>
      <div className={classes.progContainer}>
        <div className={classes.progWrapper}>
          <div
            className={classes.prog}
            style={{
              width: progress * 100 + '%',
            }}
          ></div>
        </div>
      </div>
      <Button onClick={onShare}>
        <ShareIcon />
      </Button>
    </div>
  )
}

export default withStyles(styles)(NavTop)
