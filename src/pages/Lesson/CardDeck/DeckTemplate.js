import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import InfoCard from './InfoCard'

const styles = {
  container: {
    width: '100%',
    overflow: 'hidden',
    height: '100vh',
    position: 'relative',
  },
}

const DeckTemplate = ({
  keyExtractor,
  cards,
  dataRenderer,
  classes,
  next,
  cardStyles = {},
  containerStyle,
}) => {
  const [currentCard, setCurrentCard] = useState(0)
  const cardsRev = cards.slice().reverse()
  const onNext = () => {
    const nextNumber = currentCard + 1
    if (nextNumber > cards.length - 1) {
      return next()
    }
    return setCurrentCard(nextNumber)
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
            disabled={currentCard !== index}
            onExited={onNext}
            dataRenderer={dataRenderer}
            containerStyle={cardStyles.container}
            wrapperStyle={cardStyles.wrapper}
          />
        )
      })}
    </div>
  )
}

export default withStyles(styles)(DeckTemplate)
