import Test from '@models/test'

const update = async (req, res, next) => {
  try {
    const { testId } = req.params
    const { test } = req.body

    const foundTest = await Test.findById(testId)

    if (!foundTest) {
      return next(new NotFoundError('Aucun test avec cet id'))
    }

    if (test.score) {
      if (test.score > 0) {
        foundTest.status = 'passed'
      } else {
        foundTest.status = 'refused'
      }
      foundTest.score = test.score
    }
    console.log(foundTest)
    await foundTest.save()

    return res.json({ $message: 'Exercice corrigé' })
  } catch (error) {
    console.log(error)
    return next(new CatchError(error))
  }
}

export default update
