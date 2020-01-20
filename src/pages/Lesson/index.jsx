import Button from '@material-ui/core/Button'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import Stack from './CardDeck'
import Loading from '../../components/Loading'
import colors from '../../utils/colors'
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

  const totalProg = sects.length > 0 ? sects[sects.length - 1].endProg : 1
  const currentProg =
    sects.length > 0
      ? currSect.startProg + (currSect.type === 'cards' ? currCardIndex : 0)
      : 0

  const nextSect = () => {
    if (currSectIndex < sects.length - 1) {
      setCurrSectIndex(currSectIndex + 1)
      setCurrCardIndex(0)
    } else {
      // TODO: SHOW END SCREEN
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

  const nextCard = () => {
    if (!currSect) return
    const { cards } = currSect
    if (
      (cards && currCardIndex === cards.length - 1) ||
      (!cards && currCardIndex === 0)
    ) {
      if (currSectIndex < sects.length - 1) {
        setCurrCardIndex(currCardIndex + 1)
      }
      setTimeout(() => {
        nextSect()
      }, 500)
    } else {
      setCurrCardIndex(currCardIndex + 1)
    }
  }
  const prevCard = () => {
    if (!currSect) return
    if (currCardIndex === 0) {
      prevSect()
    } else {
      setCurrCardIndex(currCardIndex - 1)
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

  const RenderSect = sect => {
    const { type } = sect
    console.log(sect)
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
        backgroundColor: colors.bittersweet,
      }}
    >
      <LessonContext.Provider
        value={{
          currCardIndex,
          nextCard,
          prevCard:
            currSectIndex === 0 && currCardIndex === 0 ? undefined : prevCard,
          prev: prevSect,
          next: nextSect,
          onExitLesson: () => history.push('/main'),
          progress: currentProg / totalProg,
        }}
      >
        {RenderSect(currSect)}
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
