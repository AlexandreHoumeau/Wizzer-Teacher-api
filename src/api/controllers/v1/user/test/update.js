import Test from '@models/test'
import Request from '@utils/request'

const fields = {
  only: [
    'testId', 'repository'
  ]
}
const update = async (req, res, next) => {
  try {
    // await Request.validator(req.body, validation.rules, validation.messages)
    const { repository } = await Request.values(req.body, fields)
    const { testId } = await Request.values(req.params, fields)

    const test = await Test.findById(testId)

    if (!test) {
      return next(new CatchError('Test introuvable'))
    }

    if (repository) {
      test.repository = repository
      test.status = 'pending'
      test.submitedAt = Date.now()
    }

    test.save()

    return res.json({ success: true, $message: 'Repo github bien enregistré' })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default update
