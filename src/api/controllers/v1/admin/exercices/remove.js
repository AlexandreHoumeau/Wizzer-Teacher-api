import Exercice from '@models/exercices'
import Request from '@utils/request'
import Module from '@models/modules'

const fields = ['exerciceId']

const remove = async (req, res, next) => {
  try {
    const data = await Request.values(req.params, fields)

    const exercice = await Exercice.findById(data.exerciceId)

    if (!exercice) {
      return next(new NotFoundError('Aucun exercice trouvé avec cet identifiant'))
    }

    const module = await Module.findOne({
      _exercices: { $in: data.exerciceId }
    })
    .select('_exercices')
    .exec()

    if (!module) {
      return next(new NotFoundError('Aucun module trouvé avec cet exercice'))
    }

    const newExercices = module._exercices.filter((exo) => String(exo) !== data.exerciceId)

    module._exercices = newExercices

    await module.save()
    await exercice.remove()

    return res.json({ $message: "L'exercie a bien été supprimé" })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default remove
