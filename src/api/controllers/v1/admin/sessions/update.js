import Session from '@models/session'
import Request from '@utils/request'

const fields = {
  only: [
    'days',
    'sessionId'
  ]
}

const update = async (req, res, next) => {
  try {
    const data = await Request.values(req.body, fields)

    const session = await Session.findById(data.sessionId)

    if (!session) {
      return next(new NotFoundError('Aucune session trouvé avec cet identifiant'))
    }

    const newValue = {
      ...session,
      days: data.days
    }

    await session.set(newValue)
    await session.save()

    return res.json({ session, $message: 'Session bien modifié' })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default update
