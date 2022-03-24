import Test from '@models/test'
import Request from '@utils/request'

const list = async (req, res, next) => {
  try {
    const query = await Request.query(req)

    const tests = await Test.find(query.$filter)
    .populate(query.$populate)

    return res.json({ tests })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default list
