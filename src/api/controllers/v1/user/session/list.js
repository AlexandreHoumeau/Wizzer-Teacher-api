import Session from '@models/session'

const list = async (req, res, next) => {
  try {
    const sessions = await Session.find()

    return res.json({ sessions })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default list
