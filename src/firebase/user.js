import firebase from 'firebase/app'
import generateName from 'sillyname'

let currentName = ''
const currCbs = {}
let lastChangeName

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
  return firebase
    .database()
    .ref(`status/${currentName}`)
    .set(firebase.database.ServerValue.TIMESTAMP)
}
export const checkOff = () => {
  if (currentName)
    return firebase
      .database()
      .ref(`status/${currentName}`)
      .remove()
}

export const setName = async (manualName, first) => {
  if (currentName === manualName) throw new Error('You already has that name')
  if (
    lastChangeName &&
    new Date().getTime() - lastChangeName.getTime() <= 60000
  )
    throw new Error('Must wait at least 1 min between name changing.')
  if (await checkAvailability(manualName)) {
    if (!first) lastChangeName = new Date()
    checkOff()
    currentName = manualName
    checkIn()
    trigger()
    return currentName
  }
  throw new Error('Name being used. Plz choose another one.')
}

export const createName = async () => {
  const dateStr = Date.now().toString()
  const newName = generateName() + ' ' + dateStr.substr(dateStr.length - 4)
  try {
    if (await setName(newName, true)) {
      return newName
    }
  } catch (e) {
    console.error(e)
  }
  return createName()
}

createName()

export const getName = () => currentName
