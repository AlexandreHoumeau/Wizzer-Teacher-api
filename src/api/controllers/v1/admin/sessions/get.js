import Session from '@models/session'

const get = async (req, res, next) => {
  try {
    const session = await Session.findOne()
    .populate({
      path: 'days._exercices',
      populate: {
        path: '_module'
      }
    })
    .sort({ _createdAt: -1 })

    if (!session) {
      return res.json({ session: []})
    }
    const startAt = session.days[0].currentDay
    const endAt = session.days[session.days.length - 1].currentDay

    return res.json({ session, startAt, endAt })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default get
