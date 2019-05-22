import firebase from 'firebase/app'
import { getName } from './user'
import { defaultRoom } from '../utils/constants'

let currentRoom = defaultRoom
const currCbs = {}
const localMsg = []
const remoteMsg = []
let mergedMsg = []

const trigger = () =>
  Object.keys(currCbs).forEach(key => currCbs[key] && currCbs[key](mergedMsg))

const mergeMsgs = () => {
  if (remoteMsg.length === 0) mergedMsg = localMsg
  else if (localMsg.length === 0) mergedMsg = remoteMsg
  else {
    mergedMsg = [...remoteMsg, ...localMsg].sort((a, b) => {
      if (a.time - b.time > 0) return 1
      if (a.time - b.time < 0) return -1
      return 0
    })
  }
  trigger()
}

export const getCurrentRoomRef = () =>
  firebase.database().ref(`chat/${currentRoom}`)

export const sendMsg = msg => {
  return getCurrentRoomRef().push({
    user: getName(),
    msg,
    time: firebase.database.ServerValue.TIMESTAMP,
  })
}

export const listenMsg = cb => {
  let newKey = new Date().getTime()
  while (currCbs[newKey]) {
    newKey = new Date().getTime()
  }
  currCbs[newKey] = cb
  cb(mergedMsg)
  return () => delete currCbs[newKey]
}

export const startListenMsg = () => {
  getCurrentRoomRef().on('child_added', data => {
    const roomMsg = data.val()
    if (roomMsg) {
      remoteMsg.push({
        key: data.key,
        type: 'remote',
        ...roomMsg,
      })
      mergeMsgs()
    }
  })
}
export const changeRoom = newRoom => {
  getCurrentRoomRef().off()
  currentRoom = newRoom
  startListenMsg()
}

export const getCurrentRoom = () => currentRoom

const divider = '=========='
export const pushLocalMsg = (msgs = []) => {
  localMsg.push(
    ...[divider, ...msgs, divider].map(item => ({
      type: 'local',
      time: new Date().getTime(),
      msg: item,
    }))
  )
  mergeMsgs()
}

pushLocalMsg([
  'Welcome to Chattery!',
  'type /set-name xxxxxx to change your name',
  'type /h for list of cmd',
  'or /h (cmd) for specific descriptions of a cmd',
  'More will come later!',
])
startListenMsg()
