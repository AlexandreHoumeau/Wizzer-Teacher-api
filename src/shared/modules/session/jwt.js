// import moment from 'moment'
import jwt from 'jsonwebtoken'
import Person from '@models/person'
import { jwt as jwtConfig } from '@shared/config'

export default async (id) => {
  try {
    const user = await Person
      .findById(id)
      .select('_id type')
      .exec()

    return jwt.sign({ _id: user._id, type: user.type }, jwtConfig.secret, { expiresIn: jwtConfig.expires })
  } catch (error) {
    throw new ServiceError('session', error)
  }
}
