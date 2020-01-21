import React, { useEffect, useState } from 'react'
import { getLessonSetsBySkillId } from '../../firebase/lesson'
import LessonSet from './LessonSet'
import LoadingComp from '../LoadingComp'

const Skill = ({ data }) => {
  const { title, desc } = data

  const [lessonSets, setLessonSets] = useState(null)
  useEffect(() => {
    getLessonSetsBySkillId(data.id)
      .then(setLessonSets)
      .catch(console.error)
  }, [data])

  return (
    <div style={{ padding: 10 }}>
      <h3>{title}</h3>
      <p>{desc}</p>
      <LoadingComp isLoading={lessonSets === null}>
        {lessonSets &&
          lessonSets.map((set, index) => (
            <LessonSet key={'lesson-sets-' + set.id} data={set} />
          ))}
      </LoadingComp>
    </div>
  )
}

export default Skill
