import Session from '@models/session'
import moment from 'moment'

const get = async (req, res, next) => {
  try {
    const session = await Session.findOne({
      isOnline: true
    })
    .populate({
      path: 'days',
      populate: {
        path: '_exercices',
        select: 'title _module _tests points difficulty',
        populate: [{
          path: '_module',
          select: 'title'
        }, {
          path: '_tests',
          select: '_user'
        }]
      }
    })
    .exec()

    if (!session) {
      return res.json({})
    }

    // Find check if session.days is today
    const today = moment().startOf('day')
    const todayExercices = []

    session.days.forEach((d) => {
      const isToday = moment(d.currentDay).startOf('day').isSame(today)
      if (isToday) {
        d?._exercices?.forEach((exo) => {
          todayExercices.push({
            _id: exo._id,
            title: exo.title,
            difficulty: exo.difficulty,
            points: exo.points,
            _module: exo._module,
            isDone: !!exo._tests.find((t) => String(t._user) === String(req.user._id))
          })
        })
      }
    })

    return res.json({ todayExercices })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default get
