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
        control={
          <Checkbox
            style={{ color: colors.white }}
            color="primary"
            checked={isSelected}
            onChange={onClick}
          />
        }
        label={
          <Typography className={classes.checkBoxText} variant="body1">
            {String(text)}
          </Typography>
        }
      />
    )
  }

  return (
    <Button
      style={{
        backgroundColor: isSelected
          ? showResult
            ? isCorrect
              ? 'green'
              : 'red'
            : 'yellow'
          : showResult && isCorrect
          ? 'lightgreen'
          : 'white',
        marginBottom: 10,
        borderRadius: '2vw',
      }}
      onClick={onClick}
    >
      <Typography className={classes.choiceText} variant="body1">
        {String(text)}
      </Typography>
    </Button>
  )
}

export default withStyles(styles)(Choice)
