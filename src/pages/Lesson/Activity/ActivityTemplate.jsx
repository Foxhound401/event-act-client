import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ActivityCard from './ActivityCard'
import LessonContext from '../LessonContext'

const styles = {
  container: {
    width: '100%',
    overflow: 'hidden',
    height: '100vh',
    position: 'relative',
  },
  navContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  exitContainer: {
    top: 0,
    bottom: 'unset',
    justifyContent: 'flex-start',
  },
}

const ActivityTemplate = ({
  cards,
  dataRenderer,
  classes,
  cardStyles = {},
  containerStyle,
}) => {
  const { prev, next, currCardIndex, setCardIndex } = useContext(LessonContext)
  const currCard = cards[currCardIndex]
  const onNext = () => {
    return setCardIndex(currCardIndex + 1)
  }

  return (
    <div className={classes.container} style={containerStyle}>
      <div className={classes.navContainer + ' ' + classes.exitContainer}>
        <Button variant="contained" onClick={prev}>
          X
        </Button>
      </div>
      <ActivityCard
        index={currCardIndex}
        hide={currCardIndex > cards.length - 1}
        data={currCard}
        onExited={onNext}
        dataRenderer={dataRenderer}
        containerStyle={cardStyles.container}
      />
      <div className={classes.navContainer}>
        <Button variant="contained" onClick={next}>
          Skip this activty {'>'}
        </Button>
      </div>
    </div>
  )
}

export default withStyles(styles)(ActivityTemplate)
