import Button from '@material-ui/core/Button'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import Stack from './CardDeck'
import Loading from '../../components/Loading'
import WelcomeCard from './CardDeck/WelcomeCard'
import PreviewCard from './CardDeck/PreviewCard'
import Activity from './Activity'
import { getLessonById, fetchCardsData } from '../../firebase/lesson'

import LessonContext from './LessonContext'

const LessonScreen = withRouter(({ location, history }) => {
  const searchVal = queryString.parse(location.search)
  const { lessonId } = searchVal

  const [data, setData] = useState(null)
  const [currSectIndex, setCurrSectIndex] = useState(0)
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

  const { cards: sects = [] } = data || {}
  const currSect = sects[currSectIndex]

  const nextSect = () => {
    if (currSectIndex < sects.length - 1) {
      setCurrSectIndex(currSectIndex + 1)
      setCurrCardIndex(0)
    }
  }
  const prevSect = () => {
    if (currSectIndex > 0) {
      const prevSec = sects[currSectIndex - 1]
      const { type, cards } = prevSec
      setCurrSectIndex(currSectIndex - 1)
      if (type !== 'activity') {
        setCurrCardIndex(cards ? cards.length - 1 : 0)
      } else {
        setCurrCardIndex(0)
      }
    }
  }

  useEffect(() => {
    if (!currSect) return
    const { cards } = currSect
    if (
      (cards && currCardIndex > cards.length - 1) ||
      (!cards && currCardIndex > 0)
    ) {
      setTimeout(() => {
        nextSect()
      }, 500)
    } else if (currCardIndex < 0) {
      setCurrCardIndex(0)
      prevSect()
    }
  }, [currCardIndex])

  if (!data) return <Loading />

  const RenderCard = sect => {
    const { type } = sect
    if (type === 'intro') {
      return <WelcomeCard data={data} />
    }
    if (type === 'preview') {
      return <PreviewCard data={sect} />
    }
    if (type === 'cards') {
      return <Stack data={sect} />
    }
    if (type === 'activity') {
      return <Activity data={sect} />
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
      <LessonContext.Provider
        value={{
          currCardIndex,
          setCardIndex: setCurrCardIndex,
          next: nextSect,
          prev: prevSect,
        }}
      >
        {RenderCard(currSect)}
      </LessonContext.Provider>
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
