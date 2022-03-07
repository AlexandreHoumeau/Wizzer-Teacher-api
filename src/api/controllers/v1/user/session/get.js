import Session from '@models/session'

const get = async (req, res, next) => {
  try {
    const session = await Session.findOne({
      isOnline: true
    })

    if (!session) {
      return res.json({})
    }

    return res.json({ session })
  } catch (error) {
    return next(CatchError(error))
  }
}

export default get
