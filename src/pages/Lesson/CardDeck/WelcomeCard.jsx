import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { snapToData } from '../../../firebase/lesson'
import LoadingComp from '../../../components/LoadingComp'
import colors from '../../../utils/colors'
import DeckTemplate from './DeckTemplate'

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '35%',
  },
  image: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },
  upperTextContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'inherit',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  skillText: {
    fontWeight: 'bold',
    fontSize: '2.2vh',
  },
  normalText: {
    fontSize: '2vh',
    color: colors.manatee,
    marginBottom: 'unset',
  },
  divider: {
    marginTop: '2vh',
    marginBottom: '2vh',
    width: '100%',
    height: '0.3vh',
    backgroundColor: colors.silver,
  },
}

const WelcomeCard = ({ data, classes, next, prev }) => {
  const [skill, setSkill] = useState(null)

  useEffect(() => {
    data.skill_ref
      .get()
      .then(snapToData)
      .then(setSkill)
      .catch(console.error)
  }, [data])

  return (
    <DeckTemplate
      keyExtractor={() => '0'}
      cards={[data]}
      prev={prev}
      dataRenderer={data => {
        return (
          <div className={classes.container}>
            <div className={classes.imageContainer}>
              <img
                className={classes.image}
                src="https://via.placeholder.com/150"
                alt="lesson cover img"
              ></img>
            </div>
            <div className={classes.upperTextContainer}>
              <Typography variant="h4">{data.title}</Typography>
              <div>
                <Typography className={classes.skillText} variant="body1">
                  SKILL
                </Typography>
                <LoadingComp isLoading={skill === null}>
                  <Typography className={classes.normalText} variant="body1">
                    {(skill && skill.title) || ''}
                  </Typography>
                </LoadingComp>
              </div>
            </div>
            <div className={classes.divider} />
            <Typography className={classes.normalText} variant="body1">
              By {data.by}
            </Typography>
          </div>
        )
      }}
      wrapperStyle={{
        textAlign: 'center',
      }}
      next={next}
    />
  )
}

export default withStyles(styles)(WelcomeCard)
