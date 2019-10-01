import firebase from 'firebase/app'

export const isLoggedIn = () => {
  return !!firebase.auth().currentUser
}
export const logout = () => {
  return firebase.auth().signOut()
}

export const loginAnon = () => {
  return firebase
    .auth()
    .signInAnonymously()
    .then(res => {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      return res
    })
}

export const listenUserAuth = cb => {
  return firebase.auth().onAuthStateChanged(cb)
}

export const setName = name => {
  firebase.auth().currentUser.updateProfile({
    displayName: name,
  })
}
