import firebase from 'firebase/app'

export const getCurrentUser = () => firebase.auth().currentUser
export const isLoggedIn = excludeAnon => {
  return !!getCurrentUser() && (!excludeAnon || !getCurrentUser().isAnonymous)
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
  getCurrentUser().updateProfile({
    displayName: name,
  })
}

firebase
  .auth()
  .getRedirectResult()
  .then(result => {
    // The signed-in user info.
    const { user } = result
    if (user) console.log('success', user)
  })
  .catch(error => {
    // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message
    // The email of the user's account used.
    const { email, credential } = error
    console.log(
      'error ===',
      'errorCode: ' + errorCode,
      'errorMessage: ' + errorMessage,
      'email: ' + email,
      'credential: ' + credential,
      'error end ==='
    )
    // ...
  })
