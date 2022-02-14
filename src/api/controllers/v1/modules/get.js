/* eslint-disable no-plusplus */
import Module from '@models/modules'
import Test from '@models/test'

const get = async (req, res, next) => {
  try {
    const { moduleId } = req.params
    const tests = await Test.find({
      _module: moduleId
    })

    const module = await Module.findById(moduleId)
    .populate('_exercices')
    .exec()
    const exercices = []

    module._exercices.forEach((exercice) => {
      const foundTest = tests.find((t) => String(t._exercice) === String(exercice._id))
      const value = { ...exercice._doc }

      if (foundTest) {
        value.test = foundTest
      }

      exercices.push(value)
    })

    return res.json({ module, exercices })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default get
