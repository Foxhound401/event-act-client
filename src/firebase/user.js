import firebase from 'firebase/app'

import generateName from 'sillyname'

let currentName = ''

// TODO: check if user existed online
export const checkAvailability = newName => {
  // firebase.database().ref(`user/${currentName}`).once('value').then(snap => {
  //   const val = snap.val()
  //   if (!val || Date.now() - val.date > )
  // })
  return true
}

export const createName = () => {
  const dateStr = Date.now().toString()
  const newName = generateName() + ' ' + dateStr.substr(dateStr.length - 4)
  if (checkAvailability(newName)) {
    currentName = newName
    return currentName
  }
  return createName()
}

export const setName = manualName => {
  if (checkAvailability(manualName)) {
    currentName = manualName
    return currentName
  }
  return false
}

createName()

export const getName = () => currentName
