import firebase from 'firebase/app'
import { getName } from './user'
import { defaultRoom } from '../utils/constants'

let currentRoom = defaultRoom
let currCb

export const getCurrentRoomRef = () =>
  firebase.database().ref(`chat/${currentRoom}`)

export const sendMsg = msg => {
  return getCurrentRoomRef().push({
    user: getName(),
    msg,
  })
}

export const listenMsg = cb => {
  currCb = cb
  getCurrentRoomRef().on('value', cb)
}
export const stopListenMsg = cb => {
  currCb = null
  getCurrentRoomRef().on('value', cb)
}

export const changeRoom = newRoom => {
  getCurrentRoomRef().off('value')
  currentRoom = newRoom
  if (currCb) {
    firebase
      .database()
      .ref(`chat/${currentRoom}`)
      .on('value', currCb)
  }
}

export const getCurrentRoom = () => currentRoom
