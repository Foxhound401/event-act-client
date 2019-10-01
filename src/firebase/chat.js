import firebase from 'firebase/app'
import { getCurrentName, checkIn, getUsersInRoomRef } from './user'
import { defaultRoom } from '../utils/constants'

let currentRoom = encodeURI(
  window.location.pathname.substring(1) || defaultRoom
).toLowerCase()
const currCbs = {}
const localMsg = []
const remoteMsg = []

const trigger = () =>
  Object.keys(currCbs).forEach(key => currCbs[key] && currCbs[key](remoteMsg))

export const getCurrentRoomRef = () =>
  firebase.database().ref(`chat/${currentRoom}`)

export const sendMsg = msg => {
  return getCurrentRoomRef().push({
    user: getCurrentName(),
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
  cb(remoteMsg)
  return () => delete currCbs[newKey]
}

export const startListenMsg = startTime => {
  getCurrentRoomRef().on('child_added', data => {
    const roomMsg = data.val()
    if (roomMsg.time > startTime) {
      remoteMsg.push({
        key: data.key,
        type: 'remote',
        ...roomMsg,
      })
      trigger()
    }
  })
}

export const getCurrentRoom = () => currentRoom || 'public'

const divider = '=========='
export const pushLocalMsg = (msgs = [], noDivider) => {
  remoteMsg.push(
    ...(noDivider ? msgs : [divider, ...msgs, divider]).map((item, index) => ({
      type: 'local',
      // time: new Date().getTime() + index,
      time: remoteMsg[remoteMsg.length - 1]
        ? remoteMsg[remoteMsg.length - 1].time + index
        : new Date().getTime() - 30000 + index,
      msg: item,
    }))
  )
  trigger()
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
    'type /name (name) to change your name',
    'type /h for list of cmd',
    'or /h (cmd) for specific descriptions of a cmd',
    'More will come later!',
  ])
  startListenMsg(Date.now())
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
