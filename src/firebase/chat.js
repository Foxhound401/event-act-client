import firebase from 'firebase/app'
import { getName, checkIn, getUsersInRoomRef } from './user'
import { defaultRoom } from '../utils/constants'

let currentRoom = encodeURI(
  window.location.pathname.substring(1) || defaultRoom
).toLowerCase()
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

export const getCurrentRoom = () => currentRoom || 'public'

const divider = '=========='
export const pushLocalMsg = (msgs = [], noDivider) => {
  localMsg.push(
    ...(noDivider ? msgs : [divider, ...msgs, divider]).map(item => ({
      type: 'local',
      time: new Date().getTime(),
      msg: item,
    }))
  )
  mergeMsgs()
}

export const startListenUsersInRoom = () => {
  getUsersInRoomRef().on('child_removed', snap => {
    pushLocalMsg([snap.key + ' left.'], true)
  })
  getUsersInRoomRef().on('child_added', snap => {
    pushLocalMsg([snap.key + ' enter the room.'], true)
  })
}
export const stopListenUsersInRoom = () => {
  getUsersInRoomRef().off('child_removed')
  getUsersInRoomRef().off('child_added')
}

export const msgSetup = () => {
  remoteMsg.splice(0, remoteMsg.length)
  localMsg.splice(0, localMsg.length)
  pushLocalMsg([
    'Welcome to Chattery!',
    'Default room is public',
    'type /go (room name) to go to a different room',
    'type /set-name (name) to change your name',
    'type /h for list of cmd',
    'or /h (cmd) for specific descriptions of a cmd',
    'More will come later!',
  ])
  startListenMsg()
  checkIn()
  startListenUsersInRoom()
}
export const changeRoom = newRoom => {
  history.pushState(null, '', '/' + newRoom)

  getCurrentRoomRef().off()
  stopListenUsersInRoom()
  currentRoom = encodeURI(newRoom || 'public').toLowerCase()
  msgSetup()
}
