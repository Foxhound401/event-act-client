import React, { useState, useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import InfoCard from './InfoCard'
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
    justifyContent: 'space-between',
  },
}

const DeckTemplate = ({
  keyExtractor,
  cards,
  dataRenderer,
  classes,
  cardStyles = {},
  containerStyle,
}) => {
  const { currCardIndex, setCardIndex } = useContext(LessonContext)
  const [transitioning, setTransitioning] = useState(false)
  const cardsRev = cards.slice().reverse()

  const setupTransitioning = () => {
    if (transitioning) return false
    setTransitioning(true)
    setTimeout(() => setTransitioning(false), 300)
  }

  const onNext = isClick => {
    if (isClick) {
      if (transitioning) return false
      setupTransitioning()
    }
    return setCardIndex(currCardIndex + 1)
  }

  const onPrev = isClick => {
    if (isClick) {
      if (transitioning) return false
      setupTransitioning()
    }
    return setCardIndex(currCardIndex - 1)
  }
  return (
    <div className={classes.container} style={containerStyle}>
      {cardsRev.map((card, i) => {
        const index = cardsRev.length - 1 - i
        return (
          <InfoCard
            key={keyExtractor(card, i)}
            index={index}
            data={card}
            disabled={currCardIndex !== index}
            currentIndex={currCardIndex}
            onExited={onNext}
            dataRenderer={dataRenderer}
            containerStyle={cardStyles.container}
            wrapperStyle={cardStyles.wrapper}
          />
        )
      })}
      <div className={classes.navContainer}>
        <Button variant="contained" onClick={() => onPrev(true)}>
          {'<'}
        </Button>
        <Button variant="contained" onClick={() => onNext(true)}>
          {'>'}
        </Button>
      </div>
    </div>
  )
}

export default withStyles(styles)(DeckTemplate)
