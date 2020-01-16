import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ActivityCard from './ActivityCard'

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
  next,
  cardStyles = {},
  containerStyle,
  prev,
}) => {
  const [currentCard, setCurrentCard] = useState(0)
  const currCard = cards[currentCard]
  const onNext = () => {
    return setCurrentCard(currentCard + 1)
  }

  useEffect(() => {
    if (currentCard > cards.length - 1) {
      setTimeout(() => {
        next()
      }, 500)
    } else if (currentCard < 0) {
      setCurrentCard(0)
      prev()
    }
  }, [currentCard])
  return (
    <div className={classes.container} style={containerStyle}>
      <div className={classes.navContainer + ' ' + classes.exitContainer}>
        <Button variant="contained" onClick={prev}>
          X
        </Button>
      </div>
      <ActivityCard
        index={currentCard}
        hide={currentCard > cards.length - 1}
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
