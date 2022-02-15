import Modules from '@models/modules'

const list = async (req, res, next) => {
  try {
    const modules = await Modules.find()
    .populate({
      path: '_exercices',
      populate: {
        path: '_tests',
        match: { _user: req.user._id }
      }
    })
    .exec()

    if (!modules?.length) {
      return next(new CatchError('Aucun module trouvé'))
    }

    const mapped = modules.reduce((acc, module) => {
      if (module.type === 'dev') {
        acc.dev.push(module)
      } else {
        acc.design.push(module)
      }
      return acc
    }, { dev: [], design: []})

    return res.json({ dev: mapped.dev, design: mapped.design })
  } catch (err) {
    return next(new CatchError(err))
  }
}

export default list
