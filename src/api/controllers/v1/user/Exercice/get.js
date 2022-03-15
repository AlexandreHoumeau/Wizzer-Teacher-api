import Exercice from '@models/exercices'

const get = async (req, res, next) => {
  try {
    const exercice = await Exercice.findById(req.params.exerciceId)
    .populate({
      path: '_module'
    })
    if (!exercice) {
      return next(new NotFoundError('Aucun exercice avec cet identifiant'))
    }

    return res.json({ exercice })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default get
