import React from 'react'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import DeckTemplate from './DeckTemplate'
import colors from '../../../utils/colors'

const styles = {
  textContainer: {
    flex: 1,
    overflowY: 'scroll',
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    padding: '1.5vh 8vw',
    borderRadius: '10vh',
    backgroundColor: colors.cinnabar,
    color: colors.white,
    fontSize: '2.2vh',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: colors.cinnabar99Opa,
    },
  },
  imageContainer: {
    width: '100%',
    height: '30%',
    marginBottom: '2vw',
  },
  image: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
  },
}

const CardDeck = ({ data, classes }) => {
  const { cards, id } = data
  return (
    <DeckTemplate
      keyExtractor={(c, i) => id + '-' + i}
      cards={cards}
      dataRenderer={(data, props) => {
        const { desc = [], button, image_url } = data
        const texts = Array.isArray(desc) ? desc : [desc]

        return (
          <>
            {image_url ? (
              <div className={classes.imageContainer}>
                <img
                  className={classes.image}
                  src={image_url}
                  onError={e => {
                    e.target.src = 'https://via.placeholder.com/150'
                  }}
                  alt="card img"
                />
              </div>
            ) : (
              false
            )}
            <div className={classes.textContainer}>
              {texts.map((t, index) => (
                <Typography
                  variant="body1"
                  key={'card-text-' + props.key + '-' + index}
                >
                  {t}
                </Typography>
              ))}
            </div>
            {button ? (
              <div className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={!props.disabled ? props.slideOut : undefined}
                >
                  {button}
                </Button>
              </div>
            ) : (
              false
            )}
          </>
        )
      }}
    />
  )
}

export default withStyles(styles)(CardDeck)
