import Test from '@models/test'
import Exercice from '@models/exercices'
import Person from '@models/person'
import Session from '@models/session'
import Request from '@utils/request'

const fields = {
  only: [
    '_exercice', 'repository', 'battle'
  ]
}
const create = async (req, res, next) => {
  try {
    // await Request.validator(req.body, validation.rules, validation.messages)
    const { _exercice, battle, repository } = await Request.values(req.body, fields)
    const user = await Person.findById(req.user._id)

    if (!user) {
      return next(new CatchError('Utilisateur introuvable'))
    }

    const exercice = await Exercice.findById(_exercice)

    if (!exercice) {
      return next(new CatchError('Exercice introuvable'))
    }

    const test = new Test({
      _exercice,
      _module: exercice._module,
      _user: user._id
    })

    if (battle) {
      const currentBattle = await Session.findOne({
        isOnline: true
      })
      if (currentBattle) {
        test._battle = currentBattle._id
      }
    }

    if (repository) {
      test.repository = repository
    }

    await test.save()

    if (!test) {
      return next(new CatchError('Un problème est survenue'))
    }

    exercice._tests.push(test._id)
    await exercice.save()

    return res.json({ test })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default create
