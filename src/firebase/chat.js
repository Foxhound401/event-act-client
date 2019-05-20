import firebase from 'firebase/app'
import { getName } from './user'

let currentRoom = 'public'
let currCb

export const sendMsg = msg => {
  return firebase
    .database()
    .ref(`chat/${currentRoom}`)
    .push({
      user: getName(),
      msg,
    })
}

export const listenMsg = cb => {
  currCb = cb
  firebase
    .database()
    .ref(`chat/${currentRoom}`)
    .on('value', cb)
}

export const changeRoom = newRoom => {
  firebase
    .database()
    .ref(`chat/${currentRoom}`)
    .off('value')
  currentRoom = newRoom
  if (currCb) {
    firebase
      .database()
      .ref(`chat/${currentRoom}`)
      .on('value', currCb)
  }
}
