import Button from '@material-ui/core/Button'
import firebase from 'firebase/app'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import Stack from './CardDeck'
import Loading from '../../components/Loading'
import WelcomeCard from './CardDeck/WelcomeCard'
import PreviewCard from './CardDeck/PreviewCard'
import Activity from './Activity'
import { getLessonById, fetchCardsData } from '../../firebase/lesson'

const path = 'lessons'

const LessonScreen = withRouter(({ location, history }) => {
  const searchVal = queryString.parse(location.search)
  const { lessonId } = searchVal

  const [data, setData] = useState(null)
  const [currCardIndex, setCurrCardIndex] = useState(0)
  useEffect(() => {
    getLessonById(lessonId)
      .then(async res => {
        res.cards = await fetchCardsData(res.cards)
        return res
      })
      .then(setData)
      .catch(console.error)
  }, [])

  if (!data) return <Loading />

  const { cards = [] } = data
  const currCard = cards[currCardIndex]

  const nextCard = () =>
    currCardIndex < cards.length - 1
      ? setCurrCardIndex(currCardIndex + 1)
      : false
  const prevCard = () =>
    currCardIndex > 0 ? setCurrCardIndex(currCardIndex - 1) : false

  const RenderCard = card => {
    const { type } = card
    console.log(card)
    if (type === 'intro') {
      return <WelcomeCard data={data} next={nextCard} prev={prevCard} />
    }
    if (type === 'preview') {
      return <PreviewCard data={card} next={nextCard} prev={prevCard} />
    }
    if (type === 'cards') {
      return <Stack data={card} next={nextCard} prev={prevCard} />
    }
    if (type === 'activity') {
      return <Activity data={card} next={nextCard} prev={prevCard} />
    }
    return false
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {RenderCard(currCard)}
    </div>
  )
})

const EndScreen = ({ onRelearn, backToMenu }) => {
  return (
    <>
      <Button onClick={onRelearn}>Relearn</Button>
      <Button onClick={backToMenu}>Back to Main menu</Button>
    </>
  )
}

export default LessonScreen
