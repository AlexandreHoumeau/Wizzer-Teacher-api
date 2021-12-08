import Modules from '@models/modules'

const get = async (req, res, next) => {
  try {
    const { moduleId } = req.params
    const module = await Modules.findById(moduleId)

    return res.json({ module })
  } catch (err) {
    return next(new CatchError(err))
  }
}

export default get
