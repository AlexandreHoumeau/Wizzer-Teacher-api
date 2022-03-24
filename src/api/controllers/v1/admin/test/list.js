import Test from '@models/test'
import parseJSON from '@shared/utils/json'

const list = async (req, res, next) => {
  try {
    const query = parseJSON(req.query)
    const { $filter, $populate } = parseJSON(query)

    const tests = await Test.find($filter)
    .populate($populate)

    console.log(tests)

    return res.json({ tests })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default list
