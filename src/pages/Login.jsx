import React from 'react'
import firebase from '@firebase/app'
import { useHistory, useLocation } from 'react-router-dom'
import useIsLoggedIn from '../utils/hooks/useIsLoggedIn'
import Loading from '../components/Loading'

const provider = new firebase.auth.GoogleAuthProvider()

const LoginPage = () => {
  const history = useHistory()
  const location = useLocation()

  const { from } = location.state || { from: { pathname: '/' } }

  const isLoggedIn = useIsLoggedIn()
  if (isLoggedIn === null) return <Loading />
  if (isLoggedIn) {
    history.replace(from)
    return false
  }
  const login = () => {
    // fakeAuth.authenticate(() => {
    //   history.replace(from);
    // });
    firebase.auth().signInWithRedirect(provider)
  }

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  )
}
export default LoginPage
