import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import ActivityMultiChoices from './ActivityMultiChoices'

import Choice from './Choice'

const InfoCard = withStyles({
  label: {
    height: '100%',
    flexDirection: 'column',
  },
})(({ id, data = {}, disabled, onExited, classes, containerStyle = {} }) => {
  const { desc = [], button, type, choices } = data
  const texts = Array.isArray(desc) ? desc : [desc]
  const [selected, setSelected] = useState([])

  const [slideIn, setSlideIn] = useState(true)
  const [direction, setDirection] = useState('right')
  const slideOut = () => {
    setDirection('left')
    setSlideIn(false)
  }
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        ...containerStyle,
      }}
    >
      <Fade
        in={slideIn}
        mountOnEnter
        unmountOnExit
        onExited={onExited}
        timeout={500}
      >
        <div
          style={{
            width: 300,
            height: 300,
            backgroundColor: 'gainsboro',
            border: '1px solid grey',
            display: 'flex',
            flexDirection: 'column',
            padding: 5,
          }}
          onClick={!disabled && type === 'result' ? slideOut : undefined}
          onKeyDown={event => {
            if (event.keycode === 13 && !disabled && type === 'result')
              slideOut()
          }}
          role="button"
          tabIndex={0}
        >
          {texts.map((t, index) => (
            <p key={'card-text-' + id + '-' + index}>{t}</p>
          ))}
          {type === 'question_multi' || type === 'check_list' ? (
            <ActivityMultiChoices
              data={data}
              disabled={disabled}
              onDone={slideOut}
            />
          ) : (
            false
          )}
          {button ? (
            <Button variant="contained" onClick={slideOut} disabled={disabled}>
              {button}
            </Button>
          ) : (
            false
          )}
        </div>
      </Fade>
    </div>
  )
})

export default InfoCard
