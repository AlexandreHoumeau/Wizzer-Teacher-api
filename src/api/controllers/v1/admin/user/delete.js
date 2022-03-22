import People from '@models/person'

const DeleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params
    console.log(userId)
    const user = await People.findById(userId)

    if (!user) {
      return next(new NotFoundError('Aucun utilisateur avev cet id'))
    }

    await user.remove()

    return res.json({ $message: 'Utilisateur correctement éffacé' })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default DeleteUser
