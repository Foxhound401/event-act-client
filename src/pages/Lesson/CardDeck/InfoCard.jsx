import React, { useEffect, useState } from 'react'
import { useSpring, animated, interpolate } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles'
import colors from '../../../utils/colors'

const theme = createMuiTheme({
  typography: {
    // fontFamily: 'Raleway, Arial',
    h4: {
      color: colors.bittersweet,
      fontSize: '5vh',
    },
    body1: {
      color: colors.bittersweet,
      fontSize: '3.5vh',
      marginBottom: '3vh',
    },
    useNextVariants: true,
  },
})

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({
  x: 0,
  y: i * (window.innerHeight / 90),
  scale: 1 - i * 0.01,
  rot: 0,
  delay: i * 50,
})
const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -window.innerHeight * 2 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(0deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`

function InfoCard({
  index,
  key,
  classes,
  data = {},
  disabled,
  onExited,
  containerStyle = {},
  wrapperStyle = {},
  dataRenderer = () => false,
  currentIndex,
}) {
  const [gone, setGone] = useState(false)
  const [props, set] = useSpring(() => ({
    ...to(index - currentIndex),
    from: from(index - currentIndex),
  })) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity

  const slideOut = (triggerExit = true) => {
    set({
      x: window.innerWidth * 2,
      rot: 100,
      scale: 1.1,
      delay: undefined,
      config: { friction: 50, tension: 200 },
    })
    if (triggerExit) setTimeout(() => onExited && onExited(), 400)
  }
  const slideIn = () => {
    set(to(index - currentIndex))
  }

  useEffect(() => {
    if (currentIndex > index && !gone) {
      slideOut(false)
    } else if (currentIndex <= index) {
      setGone(false)
      slideIn()
    }
  }, [currentIndex])

  const bind = useDrag(({ down, movement: [mx], velocity }) => {
    if (disabled) return // We're only interested in changing spring-data for the current spring
    const trigger = Math.abs(mx) > 20 // If you flick hard enough it should trigger the card to fly out
    const dir = mx < 0 ? -1 : 1 // Direction should either point left or right
    const isGone = !down && trigger
    setGone(isGone)
    const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
    const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
    const scale = down ? 1.1 : 1 // Active cards lift up a bit
    set({
      x,
      rot,
      scale,
      delay: undefined,
      config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
    })
    if (isGone) {
      setTimeout(() => onExited && onExited(), 400)
    }
  })
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  const { x, y, rot, scale } = props
  return (
    <animated.div
      className={classes.cardContainer}
      style={{
        transform: interpolate(
          [x, y],
          (x, y) => `translate3d(${x}px,${y}px,0)`
        ),
        ...containerStyle,
      }}
    >
      {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
      <animated.div
        className={classes.card}
        {...bind()}
        style={{
          transform: interpolate([rot, scale], trans),
          ...wrapperStyle,
        }}
      >
        <MuiThemeProvider theme={theme}>
          {dataRenderer(data, {
            disabled,
            slideOut,
            key,
          })}
        </MuiThemeProvider>
      </animated.div>
    </animated.div>
  )
}

export default withStyles({
  cardContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    willChange: 'transform',
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
    padding: '5vw',
    paddingBottom: '6vw',
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    // maxWidth: '300px',
    height: '100%',
    // maxHeight: '300px',
    willChange: 'transform',
    borderRadius: '5vw',
    boxShadow:
      '0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)',

    border: '1px solid ' + colors.geyser,
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
})(InfoCard)
