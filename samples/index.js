const firebase = require('firebase')
// import '@firebase/auth'
// import '@firebase/database'
// import '@firebase/firestore'
// import 'firebase/analytics'

const config = {
  apiKey: 'AIzaSyB7XUK6xrt_pLFqAkgNitMn9cMgkq8F6rg',
  authDomain: 'event-act.firebaseapp.com',
  databaseURL: 'https://event-act.firebaseio.com',
  projectId: 'event-act',
  storageBucket: 'event-act.appspot.com',
  messagingSenderId: '88981020990',
  appId: '1:88981020990:web:e607e41c5451649e05cc6f',
  measurementId: 'G-CXDN47TL3J',
}

const app = firebase.initializeApp(config)
// app.analytics()

module.exports = app
