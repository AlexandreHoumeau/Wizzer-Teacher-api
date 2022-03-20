import Session from '@models/session'

const ranking = async (req, res, next) => {
  try {
    const { sessionId } = req.params

    const session = await Session.findById(sessionId)
    .populate({
      path: 'days',
      populate: {
        path: '_exercices',
        select: 'points _tests,',
        populate: {
          path: '_tests',
          select: 'score _user',
          populate: {
            path: '_user',
            select: 'firstName lastName picture'
          }
        }
      }
    })

    const exoReducer = session.days.reduce((acc, day) => {
      if (day._exercices.length > 0) {
        day._exercices.forEach((exo) => {
          if (!acc.exerices.find((e) => e === exo._id)) {
            acc.exerices.push(exo._id)
            acc.totalTests += 1
            acc.totalScore += exo.points

            const foundUserTest = exo._tests.find((t) => String(t._user._id) === req.user._id)
            if (foundUserTest) {
              acc.userParticipation += 1
              acc.userScore += foundUserTest?.score || 0
            }

            exo._tests.forEach((test) => {
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
            })
          }
        })
      }
      return acc
    }, { totalTests: 0, totalScore: 0, userParticipation: 0, userScore: 0, exerices: [], rank: []})

    const totalScore = exoReducer.rank.reduce((acc, r) => r.userScore + acc, 0)
    const treshold = totalScore > 0 ? 'userScore' : 'userParticipation'
    exoReducer.rank.sort((a, b) => b[treshold] - a[treshold])
    exoReducer.userPosition = exoReducer.rank.findIndex((r) => r._id === req.user._id) + 1

    return res.json({ session: exoReducer })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default ranking
