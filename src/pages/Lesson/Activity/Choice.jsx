import Button from '@material-ui/core/Button'
import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import FormControlLabel from '@material-ui/core/FormControlLabel'

import colors from '../../../utils/colors'

const styles = {
  choiceText: {
    color: colors.cinnabar,
    fontSize: '2.5vh',
    marginBottom: 'unset',
  },
  checkBoxText: {
    color: colors.white,
    fontSize: '2.5vh',
    marginBottom: 'unset',
  },
}

const Choice = ({
  onClick,
  index,
  showResult,
  checkSelected,
  checkCorrected = () => false,
  text,
  isCheckbox,
  classes,
}) => {
  const isSelected = checkSelected(index)
  const isCorrect = checkCorrected(index)

  if (isCheckbox) {
    return (
      <FormControlLabel
        control={(
          <Checkbox
            style={{ color: colors.white }}
            color="primary"
            checked={isSelected}
            onChange={onClick}
          />
        )}
        label={(
          <Typography className={classes.checkBoxText} variant="body1">
            {String(text)}
          </Typography>
        )}
      />
    )
  }

  let background = colors.white
  let textColor = colors.cinnabar
  if (isSelected) {
    background = colors.mustard
    if (showResult) {
      textColor = colors.white
      background = colors.forestGreen
      if (!isCorrect) {
        background = colors.mojo
      }
    }
  } else if (showResult && isCorrect) {
    textColor = colors.white
    background = colors.jungleGreen
  }

  return (
    <Button
      style={{
        backgroundColor: background,
        marginBottom: 10,
        borderRadius: '2vw',
      }}
      onClick={onClick}
    >
      <Typography
        className={classes.choiceText}
        style={{
          color: textColor,
        }}
        variant="body1"
      >
        {String(text)}
      </Typography>
    </Button>
  )
}

export default withStyles(styles)(Choice)
