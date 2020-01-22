import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { snapToData } from '../firebase/lesson'
import LoadingComp from './LoadingComp'

const LessonCard = withRouter(({ history, data }) => {
  const [skill, setSkill] = useState(null)

  useEffect(() => {
    data.skill_ref
      .get()
      .then(snapToData)
      .then(setSkill)
      .catch(console.error)
  }, [data])

  return (
    <Paper
      style={{
        margin: 5,
        padding: 5,
        textAlign: 'center',
      }}
      onClick={() => history.push('/lesson?id=' + data.id)}
    >
      <h4>{data.title}</h4>
      <sub>by {data.by}</sub>
      <br />
      <LoadingComp isLoading={skill === null}>
        <sub>{(skill && skill.title) || ''}</sub>
      </LoadingComp>
    </Paper>
  )
})

export default LessonCard
