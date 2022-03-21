import Exercice from '@models/exercices'

const stats = async (req, res, next) => {
  try {
    const exercices = await Exercice.find()
    .populate({
      path: '_tests _module'
    })
    .select('_tests _module points title difficulty')

    const statsReduce = exercices.reduce((acc, exo) => {
      acc.nmbExercices += 1

      if (acc.randomExercice.length < 3) {
        const random = exercices[Math.floor(Math.random() * exercices.length)]
        const findRandom = acc.randomExercice.find((re) => re._id === random._id)

        if (!findRandom) {
          acc.randomExercice.push({
            id: random._id,
            title: random.title,
            difficulty: random.difficulty,
            moduleTitle: random._module.title
          })
        }
      }

      const foundModule = acc.modulesParticipation.findIndex((m) => m.id === exo._module._id)
      if (foundModule < 0) {
        acc.modulesParticipation.push({
          id: exo._module._id,
          title: exo._module.title,
          exercices: 1,
          exerciceDone: 0
        })
      } else {
        acc.modulesParticipation[foundModule].exercices += 1
      }

      exo._tests.forEach((test) => {
        if (String(test._user) === req.user._id) {
          acc.exoDone += 1

          // console.log(acc.modulesParticipation)
          const moduleIndex = acc.modulesParticipation.findIndex((m) => String(m.id) === String(test._module))
          acc.modulesParticipation[moduleIndex].exerciceDone += 1
          if (test.status === 'passed') {
            acc.goodExercices += 1
          }
        }
      })

      return acc
    }, { exoDone: 0, moduleDone: 0, modulesParticipation: [], goodExercices: 2, nmbExercices: 0, randomExercice: []})

    statsReduce.modulesParticipation.sort((a, b) => ((b.exerciceDone / b.exercices) * 100) - ((a.exerciceDone / a.exercices) * 100))
    statsReduce.moduleDone = statsReduce.modulesParticipation.filter((mp) => mp.exerciceDone > 0).length

    return res.json({ statsReduce })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default stats
