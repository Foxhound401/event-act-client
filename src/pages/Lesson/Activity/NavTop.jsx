import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import colors from '../../../utils/colors'

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
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
  title: {
    color: colors.white,
    fontSize: '4vh',
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
  },
}

const NavTop = ({ prev, title = '', classes }) => {
  return (
    <div className={classes.container}>
      <Button className={classes.button} onClick={prev}>
        <CloseIcon className={classes.icon} />
      </Button>
      {title ? (
        <Typography className={classes.title}>{title}</Typography>
      ) : (
        false
      )}
    </div>
  )
}

export default withStyles(styles)(NavTop)
