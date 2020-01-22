import React, { useEffect, useState } from 'react'
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import { getAllSkills } from '../firebase/lesson'
import LoadingComp from '../components/LoadingComp'
import colors from '../utils/colors'

const colorCycle = [colors.cerulean, colors.dodgerBlue, colors.dallas]

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
      color: colors.white,
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
  },
  skillContainer: { flex: 1, overflowY: 'scroll' },
  title: { textAlign: 'center' },
  skillButton: {
    padding: 10,
    width: '100%',
    borderRadius: 0,
    height: '25vh',
  },
}

const Main = withRouter(({ history, classes }) => {
  const [skills, setSkills] = useState(null)
  useEffect(function fetchData() {
    getAllSkills()
      .then(setSkills)
      .catch(e => {
        console.error(e)
        setTimeout(fetchData, 3000)
      })
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <LoadingComp isLoading={skills === null}>
        <div className={classes.container}>
          <div className={classes.headerContainer}>
            <Typography className={classes.title} variant="h4">
              All Skills
            </Typography>
          </div>
          <div className={classes.skillContainer}>
            {skills &&
              skills.map((skill, index) => {
                const { title, id, desc } = skill
                return (
                  <Button
                    key={'skill-' + id}
                    className={classes.skillButton}
                    style={{
                      backgroundColor: colorCycle[index % 3],
                    }}
                    onClick={() =>
                      history.push({
                        pathname: '/skill',
                        search: '?id=' + id,
                        state: {
                          title,
                          id,
                          desc,
                        },
                      })
                    }
                  >
                    <Typography variant="h5">{title}</Typography>
                    {/* <Typography variant="body1">{desc}</Typography> */}
                  </Button>
                )
              })}
          </div>
        </div>
      </LoadingComp>
    </MuiThemeProvider>
  )
})

export default withStyles(styles)(Main)
