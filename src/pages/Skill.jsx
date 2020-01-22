import React, { useEffect, useState } from 'react'
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import queryString from 'query-string'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import { getSkillById, getLessonSetsBySkillId } from '../firebase/lesson'
import LoadingComp from '../components/LoadingComp'
import LessonSet from '../components/Section/LessonSet'
import colors from '../utils/colors'

const theme = createMuiTheme({
  typography: {
    // fontFamily: 'Raleway, Arial',
    h4: {
      color: colors.white,
      fontSize: '4.5vh',
    },
    h5: {
      color: colors.white,
      fontSize: '4vh',
    },
    body1: {
      color: colors.black,
      fontSize: '2.5vh',
      marginBottom: '2vh',
    },
    useNextVariants: true,
  },
})

const styles = {
  container: { height: '100%', display: 'flex', flexDirection: 'column' },
  headerContainer: {
    padding: 10,
    backgroundColor: colors.charade,
    borderBottom: '2px solid ' + colors.shuttleGray,
    display: 'flex',
    justifyContent: 'space-between',
  },
  skillContainer: { padding: 15, flex: 1, overflowY: 'scroll' },
  title: { textAlign: 'center' },
  skillButton: {
    padding: 10,
    width: '100%',
    borderRadius: 0,
    height: '25vh',
  },
  button: {
    width: '10vw',
    padding: '1vw',
    minWidth: 'unset',
  },
  icon: {
    color: colors.white,
    width: '8vw',
    height: '8vw',
  },
}

const Main = withRouter(({ location, history, classes }) => {
  const searchVal = queryString.parse(location.search)
  const { id } = searchVal
  const routeData = location.state || {}

  const [skill, setSkill] = useState(null)
  const [lessonSets, setLessonSets] = useState(null)

  useEffect(() => {
    const fetchSkill = () => {
      getSkillById(id)
        .then(setSkill)
        .catch(e => {
          console.error(e)
          setTimeout(fetchSkill, 3000)
        })
    }
    const fetchLessonSets = () => {
      getLessonSetsBySkillId(id)
        .then(setLessonSets)
        .catch(e => {
          console.error(e)
          setTimeout(fetchLessonSets, 3000)
        })
    }
    fetchSkill()
    fetchLessonSets()
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.container}>
        <div className={classes.headerContainer}>
          <Button
            className={classes.button}
            onClick={() => history.push('/main')}
          >
            <CloseIcon className={classes.icon} />
          </Button>
          <Typography className={classes.title} variant="h4">
            {(skill && skill.title) || routeData.title}
          </Typography>
          <div className={classes.button} />
        </div>
        <div className={classes.skillContainer}>
          <Typography variant="body1">
            {(skill && skill.desc) || routeData.desc}
          </Typography>
          {lessonSets &&
            lessonSets.map((set, index) => {
              return <LessonSet key={'lesson-set-' + set.id} data={set} />
            })}
        </div>
      </div>
    </MuiThemeProvider>
  )
})

export default withStyles(styles)(Main)
