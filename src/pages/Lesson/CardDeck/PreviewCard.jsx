import React from 'react'
import Typography from '@material-ui/core/Typography'

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
        return texts.map((t, index) => <Typography variant="body1" key={'card-text-' + index}>{t}</Typography>)
      }}
      next={next}
    />
  )
}

export default PreviewCard
