import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import ActivityMultiChoices from './ActivityMultiChoices'
import LessonContext from '../LessonContext'
import colors from '../../../utils/colors'
import ActivityCard from './ActivityCard'
import NavTop from './NavTop'

const styles = {
  container: {
    width: '100%',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  navContainer: {
    bottom: 0,
    width: '100%',
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: colors.white,
    paddingLeft: '7vw',
    paddingRight: '7vw',
  },
  cardButton: {
    backgroundColor: colors.jungleGreen,
    padding: '1.5vh 8vw',
    borderRadius: '10vh',
    color: colors.white,
    fontSize: '2.2vh',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: colors.forestGreen,
    },
  },
  imageContainer: {
    width: '100%',
    height: '30%',
    marginBottom: '2vw',
  },
  image: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },
}

const getRenderer = classes => (data, { slideOut, disabled }) => {
  const { desc = [], button, type, id, image_url } = data
  const texts = Array.isArray(desc) ? desc : [desc]
  const isMultiple = type === 'question_multi' || type === 'check_list'
  const hasChoices =
    type === 'question_multi' ||
    type === 'check_list' ||
    type === 'question_single'
  return (
    <>
      {image_url ? (
        <div className={classes.imageContainer}>
          <img
            className={classes.image}
            src={image_url}
            onError={e => {
              e.target.src = 'https://via.placeholder.com/150'
            }}
            alt="card img"
          />
        </div>
      ) : (
        false
      )}
      {texts.map((t, index) => (
        <Typography variant="body1" key={'card-text-' + id + '-' + index}>
          {t}
        </Typography>
      ))}
      {hasChoices ? (
        <ActivityMultiChoices
          data={data}
          disabled={disabled}
          onDone={slideOut}
          isMultiple={isMultiple}
        />
      ) : (
        false
      )}
      {!hasChoices && button ? (
        <Button
          className={classes.cardButton}
          variant="contained"
          onClick={slideOut}
          disabled={disabled}
        >
          {button}
        </Button>
      ) : (
        false
      )}
    </>
  )
}

const TypeTitleMap = {
  question_multi: 'MULTIPLE CHOICE',
  check_list: 'CHECK LIST',
  result: 'RESULT',
}

const Stack = ({ data, classes }) => {
  const { cards } = data
  const { prev, next, currCardIndex, nextCard } = useContext(LessonContext)
  const currCard = cards[currCardIndex]

  return (
    <div className={classes.container}>
      <NavTop prev={prev} title={currCard && TypeTitleMap[currCard.type]} />
      <ActivityCard
        index={currCardIndex}
        // hide={currCardIndex > cards.length - 1}
        data={currCard}
        onExited={nextCard}
        dataRenderer={getRenderer(classes)}
      />
      <div className={classes.navContainer}>
        <Button className={classes.button} onClick={next}>
          Skip this activty {'>'}
        </Button>
      </div>
    </div>
  )
}

export default withStyles(styles)(Stack)
