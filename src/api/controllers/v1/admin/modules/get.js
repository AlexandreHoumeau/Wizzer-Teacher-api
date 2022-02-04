import Modules from '@models/modules'

const get = async (req, res, next) => {
  try {
    const { moduleId } = req.params
    const modules = await Modules.findById(moduleId)
    .populate('_exercices')

    const mapped = modules._exercices.map((module) => ({
      title: module.title,
      points: module.points || 0,
      difficulty: module.difficulty === 'easy' ? 'success' : module.difficulty === 'medium' ? 'waiting' : 'error',
      battle: null,
      actions: module._id
    }))

    return res.json({ modules, _exercices: mapped })
  } catch (err) {
    return next(new CatchError(err))
  }
}

export default get
