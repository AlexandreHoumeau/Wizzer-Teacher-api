import People from '@models/person'

const list = async (req, res, next) => {
  try {
    const users = await People.find({
      type: 'user'
    })

    return res.json({ users })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default list
