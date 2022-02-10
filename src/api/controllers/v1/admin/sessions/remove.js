import Session from '@models/session'

const remove = async (req, res, next) => {
  try {
    const { sessionId } = req.params
    const session = await Session.findById(sessionId)

    if (!session) {
      return next(new NotFoundError('Aucune session trouvé avec cet identifiant'))
    }

    await session.remove()

    return res.json({ $message: 'Session bien supprimé' })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default remove
