import React, { useEffect, useState } from 'react'

import { snapToData } from '../../../firebase/lesson'
import LoadingComp from '../../../components/LoadingComp'
import DeckTemplate from './DeckTemplate'

const WelcomeCard = ({ data, classes, next }) => {
  const [skill, setSkill] = useState(null)

  useEffect(() => {
    data.skill_ref
      .get()
      .then(snapToData)
      .then(setSkill)
      .catch(console.error)
  }, [data])

  return (
    <DeckTemplate
      keyExtractor={() => '0'}
      cards={[data]}
      dataRenderer={data => {
        return (
          <>
            <h3>{data.title}</h3>
            <h5>Skill</h5>
            <LoadingComp
              isLoading={skill === null}
              renderer={() => <sub>{skill.title || ''}</sub>}
            />
            <sub>by {data.by}</sub>
          </>
        )
      }}
      wrapperStyle={{
        textAlign: 'center',
      }}
      next={next}
    />
  )
}

export default WelcomeCard
