import React from 'react'
import Loading from './Loading'

export default ({ isLoading, renderer = () => false }) => {
  return isLoading ? <Loading /> : renderer()
}
