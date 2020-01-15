import React from 'react'
import Button from '@material-ui/core/Button'
import firebase from 'firebase/app'
import { Redirect } from 'react-router-dom'
import Loading from '../components/Loading'

import useIsLoggedIn from '../utils/hooks/useIsLoggedIn'

const provider = new firebase.auth.GoogleAuthProvider()
const onLogin = () => firebase.auth().signInWithRedirect(provider)

const Login = () => {
  const isLoggedIn = useIsLoggedIn()
  if (isLoggedIn === null) return <Loading />

  if (isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/main',
        }}
      />
    )
  }

  return <Button onClick={onLogin}> LOGIN </Button>
}
export default Login
