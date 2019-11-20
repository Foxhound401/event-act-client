import { useEffect, useState } from 'react'
import { listenUserAuth } from '../../firebase/auth'

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  useEffect(() => {
    function handleStatusChange(u) {
      if (u) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }

    const listener = listenUserAuth(handleStatusChange)
    // Specify how to clean up after this effect:
    return function cleanup() {
      listener()
    }
  })
  return isLoggedIn
}
export default useIsLoggedIn
