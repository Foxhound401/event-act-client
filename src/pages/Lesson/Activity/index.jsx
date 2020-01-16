import React from 'react'
import Button from '@material-ui/core/Button'

import ActivityTemplate from './ActivityTemplate'
import ActivityMultiChoices from './ActivityMultiChoices'

const Stack = ({ data, classes }) => {
  const { cards, id } = data
  return (
    <ActivityTemplate
      cards={cards}
      dataRenderer={(data, { slideOut, disabled }) => {
        const { desc = [], button, type, choices } = data
        const texts = Array.isArray(desc) ? desc : [desc]
        return (
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
              <Button
                variant="contained"
                onClick={slideOut}
                disabled={disabled}
              >
                {button}
              </Button>
            ) : (
              false
            )}
          </div>
        )
      }}
    />
  )
}

export default Stack
