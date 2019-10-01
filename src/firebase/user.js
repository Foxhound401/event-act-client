import firebase from 'firebase/app'
import { getCurrentRoom } from './chat'

export const getCurrentName = () =>
  firebase.auth().currentUser && firebase.auth().currentUser.displayName
const currCbs = {}
let lastChangeName

export const listenName = cb => {
  let newKey = new Date().getTime()
  while (currCbs[newKey]) {
    newKey = new Date().getTime()
  }
  currCbs[newKey] = cb
  cb(getCurrentName())
  return () => delete currCbs[newKey]
}

const trigger = () =>
  Object.keys(currCbs).forEach(
    key => currCbs[key] && currCbs[key](getCurrentName())
  )

export const checkAvailability = async newName => {
  const res = await Promise.all([
    firebase
      .database()
      .ref(`status/${newName}`)
      .once('value')
      .then(snap => {
        const val = snap.val()
        if (
          !val
          // new Date().getTime() - new Date(val).getTime() > 10 * 60000
        ) {
          return true
        }
        return false
      }),
  ])

  return res.every(Boolean)
}

export const checkIn = () => {
  if (getCurrentName())
    return firebase
      .database()
      .ref(`status/${getCurrentName()}`)
      .set({
        room: getCurrentRoom(),
        uid: firebase.auth().currentUser.uid,
        time: firebase.database.ServerValue.TIMESTAMP,
      })
}
export const checkOff = () => {
  if (getCurrentName())
    return firebase
      .database()
      .ref(`status/${getCurrentName()}`)
      .set({
        uid: firebase.auth().currentUser.uid,
        time: firebase.database.ServerValue.TIMESTAMP,
      })
}
export const removeName = () => {
  if (getCurrentName())
    return firebase
      .database()
      .ref(`status/${getCurrentName()}`)
      .remove()
}

export const setName = async (manualName, first) => {
  if (getCurrentName() === manualName)
    throw new Error('You already has that name')
  if (
    lastChangeName &&
    new Date().getTime() - lastChangeName.getTime() <= 60000
  )
    throw new Error('Must wait at least 1 min between name changing.')
  if (await checkAvailability(manualName)) {
    if (!first) lastChangeName = new Date()
    removeName()
    await firebase.auth().currentUser.updateProfile({
      displayName: manualName,
    })
    await checkIn()
    trigger()
    return getCurrentName()
  }
  throw new Error('Name being used. Plz choose another one.')
}

export const getUsersInRoomRef = () =>
  firebase
    .database()
    .ref(`status`)
    .orderByChild('room')
    .equalTo(getCurrentRoom())

export const getUsersInRoom = () => {
  return getUsersInRoomRef()
    .once('value')
    .then(snap => {
      const val = snap.val()
      return val && Object.keys(val)
    })
}
