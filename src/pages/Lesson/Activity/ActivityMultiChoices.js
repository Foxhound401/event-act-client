import Button from '@material-ui/core/Button'
import React, { useState } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'

import Choice from './Choice'

const ActivityMultiChoices = ({ data = {}, disabled, onDone }) => {
  const { button, type, choices } = data
  const [selected, setSelected] = useState([])
  const onSelected = index => {
    const foundIndex = selected.findIndex(i => i === index)
    if (foundIndex > -1) {
      selected.splice(foundIndex, 1)
      setSelected(selected.slice())
    } else {
      selected.push(index)
      setSelected(selected.slice())
    }
  }

  return (
    <FormControl component="fieldset">
      <FormGroup>
        {type === 'question_multi' || type === 'check_list'
          ? choices.map((item, index) => (
              <Choice
                key={'choice-' + index}
                isCheckbox={type === 'check_list'}
                index={index}
                // showResult={showResult}
                text={item}
                onClick={() => onSelected(index)}
                checkSelected={i => selected.includes(i)}
              />
            ))
          : false}
      </FormGroup>

      {type === 'question_multi' || type === 'check_list' ? (
        <Button
          style={{ backgroundColor: 'forestgreen' }}
          variant="contained"
          onClick={onDone}
          disabled={disabled}
        >
          {button || 'Done'}
        </Button>
      ) : (
        false
      )}
    </FormControl>
  )
}

export default ActivityMultiChoices
