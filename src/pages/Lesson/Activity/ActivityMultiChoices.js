import Button from '@material-ui/core/Button'
import React, { useState } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import colors from '../../../utils/colors'

import Choice from './Choice'

const styles = {
  container: { flex: 1, justifyContent: 'space-between' },
  choiceContainer: { flex: 1, marginBottom: 15, overflowY: 'scroll' },
  button: {
    backgroundColor: colors.jungleGreen,
    padding: '1.5vh 8vw',
    borderRadius: '10vh',
    color: colors.white,
    fontSize: '2.2vh',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: colors.forestGreen,
    },
  },
}
const ActivityMultiChoices = ({
  data = {},
  disabled,
  onDone,
  classes,
  isMultiple,
}) => {
  const { button, type, choices = [], correct_ids = [] } = data
  const [selected, setSelected] = useState([])
  const [showResult, setShowResult] = useState(false)
  const hasResults = correct_ids.length > 0
  const onSelected = index => {
    if (isMultiple) {
      const foundIndex = selected.findIndex(i => i === index)
      if (foundIndex > -1) {
        selected.splice(foundIndex, 1)
        setSelected(selected.slice())
      } else {
        selected.push(index)
        setSelected(selected.slice())
      }
    } else if (selected.length === 0) {
      setSelected([index])
    }
  }

  const onDoneClick = () => {
    if (hasResults) {
      if (showResult) return
      setShowResult(true)
      setTimeout(onDone, 2000)
    } else {
      onDone()
    }
  }

  return (
    <FormControl className={classes.container}>
      <FormGroup className={classes.choiceContainer}>
        {choices.map((item, index) => (
          <Choice
            key={'choice-' + index}
            isCheckbox={type === 'check_list'}
            index={index}
            showResult={showResult}
            text={item}
            onClick={() => {
              onSelected(index)
              if (!isMultiple) {
                if (hasResults) {
                  setTimeout(onDoneClick, 1000)
                } else {
                  onDoneClick()
                }
              }
            }}
            checkSelected={i => selected.includes(i)}
            checkCorrected={i => correct_ids.includes(i)}
          />
        ))}
      </FormGroup>

      {isMultiple ? (
        <Button
          className={classes.button}
          variant="contained"
          onClick={onDoneClick}
          disabled={disabled || showResult}
        >
          {button || 'Done'}
        </Button>
      ) : (
        false
      )}
    </FormControl>
  )
}

export default withStyles(styles)(ActivityMultiChoices)
