import React, { useState, useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import InfoCard from './InfoCard'
import LessonContext from '../LessonContext'
import NavTop from './NavTop'
import colors from '../../../utils/colors'

const styles = {
  container: {
    width: '100%',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  navContainer: {
    width: '100%',
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    color: colors.white,
    width: '8vw',
    height: '8vw',
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
  const { currCardIndex, nextCard, prevCard } = useContext(LessonContext)
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
    return nextCard()
  }

  const onPrev = isClick => {
    if (isClick) {
      if (transitioning) return false
      setupTransitioning()
    }
    return prevCard()
  }
  return (
    <div className={classes.container} style={containerStyle}>
      <NavTop />
      <div
        style={{
          position: 'relative',
          flex: 1,
        }}
      >
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
      </div>
      <div className={classes.navContainer}>
        <Button disabled={!prevCard} onClick={() => onPrev(true)}>
          {prevCard ? <NavigateBeforeIcon className={classes.icon} /> : false}
        </Button>
        <Button onClick={() => onNext(true)}>
          <NavigateNextIcon className={classes.icon} />
        </Button>
      </div>
    </div>
  )
}

export default withStyles(styles)(DeckTemplate)
