import Exercice from '@models/exercices'
import Request from '@utils/request'

const fields = ['exercice', 'exerciceId']

const update = async (req, res, next) => {
  try {
    const data = await Request.values(req.body, fields)
    const exercice = await Exercice.findById(data.exerciceId)

    if (!exercice) {
      return next(new NotFoundError('Aucun exercice trouvé avec cet identifiant'))
    }
    exercice.set(data.exercice)
    exercice.save()

    return res.json({ $message: 'Cours bien modifié', $success: true })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default update
