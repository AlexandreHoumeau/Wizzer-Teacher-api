import Person from '@models/person'

export default async (id) => {
  try {
    const user = await Person.findById(id).select('_id type').exec()
    const data = { ...user.toObject() }

    return data
  } catch (error) {
    throw new ServiceError('session', error)
  }
}
