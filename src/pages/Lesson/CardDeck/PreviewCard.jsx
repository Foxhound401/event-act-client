import React from 'react'

import DeckTemplate from './DeckTemplate'

const PreviewCard = ({ data, next, prev }) => {
  return (
    <DeckTemplate
      keyExtractor={(c, i) => '0'}
      cards={[data]}
      prev={prev}
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
