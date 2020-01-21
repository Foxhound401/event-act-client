import React, { useEffect, useState } from 'react'
import { snapToData } from '../../firebase/lesson'
import LessonCard from '../LessonCard'
import LoadingComp from '../LoadingComp'

const LessonSet = ({ data }) => {
  const { title, desc } = data

  const [lessons, setLessons] = useState(null)
  useEffect(() => {
    if (!data.lessons) return
    Promise.all(data.lessons.map(ref => ref.get().then(snapToData)))
      .then(setLessons)
      .catch(console.error)
  }, [data])

  return (
    <div style={{ padding: 10 }}>
      <h3>{title}</h3>
      <p>{desc}</p>
      <LoadingComp isLoading={lessons === null}>
        {lessons &&
          lessons.map(lesson => (
            <LessonCard key={'lesson-' + lesson.id} data={lesson} />
          ))}
      </LoadingComp>
    </div>
  )
}
export default LessonSet
