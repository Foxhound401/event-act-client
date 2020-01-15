import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import useIsLoggedIn from '../utils/hooks/useIsLoggedIn'
import Loading from './Loading'

export default function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = useIsLoggedIn()
  if (isLoggedIn === null) return <Loading />
  return (
    <Route {...rest}>
      {isLoggedIn === null ? (
        <Loading />
      ) : isLoggedIn ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      )}
    </Route>
  )
}
