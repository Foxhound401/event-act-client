import React from 'react'
import Loading from './Loading'

export default ({ isLoading, children }) => {
  return isLoading ? <Loading /> : children || false
}
