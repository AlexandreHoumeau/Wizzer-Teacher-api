import Exercice from '@models/exercices'

const get = async (req, res, next) => {
  try {
    let isDone = false
    const exercice = await Exercice.findById(req.params.exerciceId)
    .populate({
      path: '_module _tests'
    })

    if (!exercice) {
      return next(new NotFoundError('Aucun exercice avec cet identifiant'))
    }

    const foundTest = exercice._tests.find((t) => String(t._user) === req.user._id)

    if (foundTest) {
      isDone = true
    }

    return res.json({ exercice, isDone })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default get
