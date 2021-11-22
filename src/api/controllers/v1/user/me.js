import Person from '@models/person'

const me = async (req, res, next) => {
  try {
    const { _id } = req.user

    const person = await Person.findById(_id)

    if (!person) {
      return new NotFoundError('Aucun utilisateur trouvé avec cet identifiant')
    }
    return res.json({ person })
  } catch (err) {
    return next(err)
  }
}

export default me
