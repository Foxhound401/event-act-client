import firebase from 'firebase/app'
import generateName from 'sillyname'
import { defaultRoom } from '../utils/constants'

import { getCurrentRoom } from './chat'

let currentName = ''
const currCbs = {}

export const listenName = cb => {
  let newKey = new Date().getTime()
  while (currCbs[newKey]) {
    newKey = new Date().getTime()
  }
  currCbs[newKey] = cb
  cb(currentName)
  return () => delete currCbs[newKey]
}

const trigger = () =>
  Object.keys(currCbs).forEach(key => currCbs[key] && currCbs[key](currentName))

export const checkAvailability = newName => {
  const room = getCurrentRoom ? getCurrentRoom() : defaultRoom

  return firebase
    .database()
    .ref(`chat/${room}`)
    .orderByChild('user')
    .equalTo(newName)
    .once('value')
    .then(snap => {
      const val = snap.val()
      if (!val) return true
      const foundDuplicate = Object.keys(val).find(key => {
        const { user } = val[key] || {}
        return user === newName
      })
      if (foundDuplicate) {
        return false
      }
      return true
    })
}

export const setName = async manualName => {
  if (currentName === manualName) throw new Error('You already has that name')
  if (await checkAvailability(manualName)) {
    currentName = manualName
    trigger()
    return currentName
  }
  throw new Error('Name being used. Plz choose another one.')
}

export const createName = async () => {
  const dateStr = Date.now().toString()
  const newName = generateName() + ' ' + dateStr.substr(dateStr.length - 4)
  if (await setName(newName)) {
    return newName
  }
  return createName()
}

createName()

export const getName = () => currentName
