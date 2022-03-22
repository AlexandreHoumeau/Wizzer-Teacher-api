import People from '@models/person'

const get = async (req, res, next) => {
  try {
    const { userId } = req.params

    const user = await People.findById(userId)

    if (!user) {
      return next(new NotFoundError('Aucun utilisateur avec cet identifiant'))
    }
    return res.json({ user })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default get
