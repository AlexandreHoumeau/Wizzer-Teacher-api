import Test from '@models/test'

const stats = async (req, res, next) => {
  try {
    const tests = await Test.find({
      score: null
    })
    .populate('_module _user')

    const reducer = tests.reduce((acc, test) => {
      const foundModule = acc.tests.findIndex((t) => String(t.moduleId) === String(test._module._id))

      if (foundModule < 0) {
        acc.tests.push({
          value: 1,
          moduleId: test._module._id,
          moduleTitle: test._module.title
        })
      } else {
        acc.tests[foundModule].value += 1
      }

      if (!acc.rank.find((r) => String(r._id) === String(test._user._id))) {
        acc.rank.push({
          _id: String(test._user._id),
          userParticipation: 1,
          firstName: test._user.firstName,
          lastName: test._user.lastName,
          userScore: test._user.score || 0
        })
      } else {
        const findIndex = acc.rank.findIndex((r) => String(r._id) === String(test._user._id))
        acc.rank[findIndex].userParticipation += 1
        acc.rank[findIndex].userScore += test.score || 0
      }
      return acc
    }, { tests: [], rank: []})

    reducer.tests.sort((a, b) => b.value - a.value)

    return res.json(reducer)
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default stats
