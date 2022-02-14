import Test from '@models/test'
import Person from '@models/person'
import Request from '@utils/request'

const fields = {
  only: [
    '_exercice', '_module'
  ]
}
const create = async (req, res, next) => {
  try {
    // await Request.validator(req.body, validation.rules, validation.messages)
    const { _exercice, _module } = await Request.values(req.body, fields)

    const user = await Person.findById(req.user._id)

    if (!user) {
      return next(new CatchError('Utilisateur introuvable'))
    }

    const test = new Test({
      _exercice,
      _module,
      _user: user._id
    })

    await test.save()

    if (!test) {
      return next(new CatchError('Un problème est survenue'))
    }

    return res.json({ test })
  } catch (error) {
    return next(CatchError(error))
  }
}

export default create
