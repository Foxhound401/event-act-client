import React, { useEffect, useState } from 'react'

import ActivityCard from './ActivityCard'

const Stack = ({ data, classes, next }) => {
  const [currentCard, setCurrentCard] = useState(0)
  const { cards, id } = data
  const onNext = () => {
    const nextNumber = currentCard + 1
    if (nextNumber > cards.length - 1) {
      return next()
    }
    setCurrentCard(nextNumber)
  }
  return (
    <div style={{ width: '100%' }}>
      {cards.map((card, index) => {
        return (
          <ActivityCard
            key={id + '-' + index}
            id={id + '-' + index}
            data={card}
            disabled={currentCard !== index}
            onExited={onNext}
            containerStyle={{
              zIndex: (cards.length - index) * 2,
              position: 'absolute',
              transform: `translate(${index * 5}px, ${index * 5}px)`,
            }}
          />
        )
      })}
    </div>
  )
}

export default Stack
