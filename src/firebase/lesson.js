import firebase from 'firebase/app'

const db = firebase.firestore()

export const getAllSkills = () => {
  return db
    .collection('skills')
    .get()
    .then(querySnapshot => querySnapshot.docs.map(snapToData))
}

export const getSkillById = id => {
  return db
    .collection('skills')
    .doc(id)
    .get()
    .then(snapToData)
}

export function getLessonSetsBySkillId(id) {
  return db
    .collection(`skills/${id}/lesson_sets`)
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs.map(snapToData)
    })
}
export const getLessonSets = (skillId, lessonSetId) => {
  return db
    .collection(`skills/${skillId}/lesson_sets`)
    .doc(lessonSetId)
    .get()
    .then(snapToData)
}

export function snapToData(snap) {
  if (snap.exists) {
    return {
      ref: snap.ref,
      id: snap.id,
      ...snap.data(),
    }
  }
  return null
}

export const getLessonById = id => {
  return db
    .doc(`lessons/${id}`)
    .get()
    .then(snapToData)
}

export const fetchCardsData = (cardArr = []) => {
  let progress = 0
  return Promise.all(
    cardArr.map(c => {
      if (c.constructor.name === 'DocumentReference') {
        // is ref
        return c
          .get()
          .then(snapToData)
          .then(res => {
            res.startProg = progress + 1
            if (res.type === 'cards') {
              progress += res.cards.length
            } else {
              progress++
            }
            res.endProg = progress
            return res
          })
      }
      c.startProg = progress + 1
      progress++
      c.endProg = progress
      return Promise.resolve(c)
    })
  )
}

// export const fetchLessonSets = async (skill) => {
//   const lesson_sets = await getLessonSetsBySkillId(skill.id)
//   skill.lesson_sets = lesson_sets
//   return skill
// }

// export const fetchLessons = async (lessonSet) => {
//   const lessons = await Promise.all(lessonSet.lessons.map(ref => ref.get().then(snapToData)))
//   lessonSet.lessons = lessons
//   return lessonSet
// }
