import Exercice from '@models/exercices'
import Request from '@utils/request'

const fields = ['exerciceId']

const get = async (req, res, next) => {
  try {
    const data = await Request.values(req.params, fields)

    const exercice = await Exercice.findById(data.exerciceId)

    if (!exercice) {
      return next(new NotFoundError('Aucun exercice trouvé avec cet identifiant'))
    }

    return res.json({ exercice })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default get
