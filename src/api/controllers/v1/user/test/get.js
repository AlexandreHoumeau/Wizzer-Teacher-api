import Test from '@models/test'
import Person from '@models/person'
import Request from '@utils/request'

const fields = {
  only: [
    'testId'
  ]
}
const get = async (req, res, next) => {
  try {
    // await Request.validator(req.body, validation.rules, validation.messages)
    const { testId } = await Request.values(req.params, fields)

    const user = await Person.findById(req.user._id)

    if (!user) {
      return next(new CatchError('Utilisateur introuvable'))
    }

    const test = await Test.findOne({
      _id: testId,
      _user: user._id
    })
    .populate('_module _exercice')
    .exec()

    if (!test) {
      return next(new CatchError('Le test n\'existe pas'))
    }

    return res.json({ test })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default get
