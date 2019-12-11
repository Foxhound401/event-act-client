import React, { useState, useEffect } from 'react'
import Collapse from '@material-ui/core/Collapse'
import Button from '@material-ui/core/Button'
import ReactPlayer from 'react-player'
import firebase from 'firebase/app'
import Loading from '../components/Loading'

const GameScreen = () => {
  const [display, setDisplay] = useState({})
  useEffect(() => {
    firebase
      .database()
      .ref('display')
      .on('value', snap => {
        const value = snap.val()
        setDisplay(value)
        console.log(value)
      })
  }, [])

  const { video_url, type, section } = display

  const { options, question, stats, type: sectionType } = section || {}

  console.log(video_url)
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {video_url ? <ReactPlayer url={video_url}> </ReactPlayer> : false}
      {section ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            background: 'white',
          }}
        >
          <div>{question}</div>
          {options.map((item, index) => (
            <div key={'opt-' + index}>
              <img src={item.image} />
              {item.text} ({stats[index]})
            </div>
          ))}
        </div>
      ) : (
        false
      )}
    </div>
  )
}
export default GameScreen
