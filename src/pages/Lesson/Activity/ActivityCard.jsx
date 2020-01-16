import Fade from '@material-ui/core/Fade'
import { withStyles } from '@material-ui/core/styles'
import React, { useState, useEffect } from 'react'

const ActivityCard = withStyles({
  label: {
    height: '100%',
    flexDirection: 'column',
  },
})(
  ({
    key,
    classes,
    data = {},
    index,
    disabled,
    hide,
    onExited,
    containerStyle = {},
    dataRenderer = () => false,
  }) => {
    const [slideIn, setSlideIn] = useState(true)
    const slideOut = () => {
      setSlideIn(false)
    }

    useEffect(() => {
      if (!hide) {
        setSlideIn(true)
      }
    }, [index])

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
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
          {dataRenderer(data, {
            disabled,
            slideOut,
            key,
          })}
        </Fade>
      </div>
    )
  }
)

export default ActivityCard
