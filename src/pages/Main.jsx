import React, { useEffect, useState } from 'react'
import { getAllSkills } from '../firebase/lesson'
import LoadingComp from '../components/LoadingComp'
import SkillSection from '../components/Section/Skill'

const Main = () => {
  const [skills, setSkills] = useState(null)
  useEffect(() => {
    getAllSkills()
      .then(setSkills)
      .catch(console.error)
  }, [])

  return (
    <div>
      <LoadingComp
        isLoading={skills === null}
        renderer={() =>
          skills.map((skill, index) => (
            <SkillSection key={'skill-' + skill.id} data={skill} />
          ))
        }
      />
    </div>
  )
}

export default Main
