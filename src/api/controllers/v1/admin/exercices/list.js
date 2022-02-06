import Exercice from '@models/exercices'

const list = async (req, res, next) => {
  try {
    const exercices = await Exercice.find()
    .populate('_module')
    .sort('_module')

    return res.json({ exercices })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default list
