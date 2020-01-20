import Fade from '@material-ui/core/Fade'
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles'
import React, { useState, useEffect } from 'react'
import colors from '../../../utils/colors'

const theme = createMuiTheme({
  typography: {
    // fontFamily: 'Raleway, Arial',
    body1: {
      color: colors.white,
      fontSize: '3.5vh',
      marginBottom: '3vh',
    },
    useNextVariants: true,
  },
})

const styles = {
  container: {
    width: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: '5vw',
    paddingBottom: '6vw',
  },
  contentWrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}

const ActivityCard = ({
  key,
  classes,
  data = {},
  index,
  disabled,
  hide,
  onExited,
  containerStyle = {},
  dataRenderer = () => false,
}) => {
  const [slideIn, setSlideIn] = useState(true)
  const slideOut = () => {
    setSlideIn(false)
  }

  useEffect(() => {
    if (!hide) {
      setSlideIn(true)
    }
  }, [index])
  const { type } = data
  const allowCardClick = !disabled && type === 'result'

  return (
    <div className={classes.container} style={containerStyle}>
      <Fade
        in={slideIn}
        mountOnEnter
        unmountOnExit
        onExited={onExited}
        timeout={500}
      >
        {allowCardClick ? (
          <div
            className={classes.contentWrapper}
            onClick={slideOut}
            onKeyDown={event => {
              if (event.keycode === 13) slideOut()
            }}
            role="button"
            tabIndex={0}
          >
            <MuiThemeProvider theme={theme}>
              {dataRenderer(data, {
                disabled,
                slideOut,
                key,
              })}
            </MuiThemeProvider>
          </div>
        ) : (
          <div className={classes.contentWrapper}>
            <MuiThemeProvider theme={theme}>
              {dataRenderer(data, {
                disabled,
                slideOut,
                key,
              })}
            </MuiThemeProvider>
          </div>
        )}
      </Fade>
    </div>
  )
}

export default withStyles(styles)(ActivityCard)
