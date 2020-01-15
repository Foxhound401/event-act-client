import React from 'react'

import DeckTemplate from './DeckTemplate'

const PreviewCard = ({ data, next }) => {
  return (
    <DeckTemplate
      keyExtractor={(c, i) => '0'}
      cards={[data]}
      wrapperStyle={{
        textAlign: 'center',
      }}
      dataRenderer={data => {
        const texts = Array.isArray(data.desc) ? data.desc : [data.desc]
        return texts.map((t, index) => <p key={'card-text-' + index}>{t}</p>)
      }}
      next={next}
    />
  )
}

export default PreviewCard
