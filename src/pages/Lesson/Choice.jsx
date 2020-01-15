import Button from '@material-ui/core/Button'
import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const Choice = ({
  onClick,
  index,
  showResult,
  checkSelected,
  checkCorrected = () => false,
  text,
  isCheckbox,
}) => {
  const isSelected = checkSelected(index)
  const isCorrect = checkCorrected(index)

  if (isCheckbox) {
    return (<FormControlLabel
    control={<Checkbox checked={isSelected} onChange={onClick} />}
    label={String(text)}
  />)
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
          : 'whitesmoke',
        marginBottom: 10,
      }}
      variant="contained"
      onClick={onClick}
    >
      {String(text)}
    </Button>
  )
}

export default Choice
