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
        select: 'title _module points',
        populate: {
          path: '_module',
          select: 'title'
        }
      }
    })

    if (!session) {
      return res.json({})
    }

    // Find check if session.days is today
    const today = moment().startOf('day')
    let todayExercices = []

    for (const d of session.days) {
      const isToday = moment(d.currentDay).startOf('day').isSame(today)
      if (isToday) {
        console.log(d)
        todayExercices = d
      }
    }

    return res.json({ todayExercices })
  } catch (error) {
    return next(CatchError(error))
  }
}

export default get
