import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import ReplayIcon from '@material-ui/icons/Replay'
import DoneIcon from '@material-ui/icons/Done'

import { snapToData } from '../../firebase/lesson'
import colors from '../../utils/colors'

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6vw',
  },
  titleText1: {
    color: colors.white,
    textAlign: 'center',
    fontSize: '6vw',
  },
  titleText2: {
    color: colors.white,
    textAlign: 'center',
    fontSize: '8vw',
    margin: '3vw',
    marginBottom: '6vw',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: { width: '30vw' },
  buttonText: { color: colors.white, fontSize: '4vw' },
  buttonLabel: {
    flexDirection: 'column',
    color: colors.white,
  },
}

const EndScreen = withRouter(({ data, history, location, classes }) => {
  const { skill_ref, title } = data

  const [skill, setSkill] = useState(null)
  useEffect(function fetchData() {
    skill_ref
      .get()
      .then(snapToData)
      .then(setSkill)
      .catch(e => {
        console.error(e)
        setTimeout(fetchData, 3000)
      })
  }, [])

  const backToSkill = () => history.push('skill?id=' + skill.id)
  const reload = () => {
    const current = location.pathname + location.search
    history.replace(`/reload`)
    setTimeout(() => {
      history.replace(current)
    })
  }

  return (
    <div className={classes.container}>
      <Typography className={classes.titleText1} variant="h5">
        Congrats! You have finished
      </Typography>
      <Typography className={classes.titleText2} variant="h4">
        {title}
      </Typography>
      <div className={classes.buttonContainer}>
        <Button
          onClick={reload}
          classes={{ label: classes.buttonLabel }}
          className={classes.button}
        >
          <ReplayIcon />
          <Typography className={classes.buttonText} variant="body1">
            Relearn
          </Typography>
        </Button>
        <Button
          onClick={backToSkill}
          classes={{ label: classes.buttonLabel }}
          className={classes.button}
        >
          <DoneIcon />
          <Typography className={classes.buttonText} variant="body1">
            Done
          </Typography>
        </Button>
      </div>
    </div>
  )
})

export default withStyles(styles)(EndScreen)
