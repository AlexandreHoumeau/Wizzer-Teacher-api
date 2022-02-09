import Session from '@models/session'
import Request from '@utils/request'

import validation from './validation'

const fields = {
  only: [
    'days'
  ]
}

const create = async (req, res, next) => {
  try {
    await Request.validator(req.body, validation.create.rules, validation.create.messages)
    const data = await Request.values(req.body, fields)

    if (!data.days?.length) {
      return next(new CatchError('Merci de sélectionner une période pour la session'))
    }

    const session = new Session()

    await session.set(data)

    await session.save()

    return res.json({ session, $message: 'Session correctement enregistré' })
  } catch (error) {
    return next(CatchError(error))
  }
}

export default create
