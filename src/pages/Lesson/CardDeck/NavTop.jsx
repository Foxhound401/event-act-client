import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ShareIcon from '@material-ui/icons/Share'
import CloseIcon from '@material-ui/icons/Close'
import LessonContext from '../LessonContext'
import colors from '../../../utils/colors'

const styles = {
  container: {
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
    backgroundColor: colors.mandy,
    borderRadius: 10,
    height: '1.5vh',
    width: '100%',
    overflow: 'hidden',
  },
  prog: {
    height: '100%',
    backgroundColor: colors.white,
  },
  icon: {
    color: colors.white,
    width: '8vw',
    height: '8vw',
  },
  button: {
    width: '10vw',
    padding: '1vw',
  },
}

const NavTop = ({ classes }) => {
  const { progress = 0, onExitLesson, onShare } = useContext(LessonContext)

  return (
    <div className={classes.container}>
      <Button className={classes.button} onClick={onExitLesson}>
        <CloseIcon className={classes.icon} />
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
      <Button className={classes.button} onClick={onShare}>
        <ShareIcon className={classes.icon} />
      </Button>
    </div>
  )
}

export default withStyles(styles)(NavTop)
