import Exercice from '@models/exercices'
import Request from '@utils/request'

const fields = {
  only: [
    'exercice', 'title', 'difficulty', 'course'
  ]
}

const validation = {
  rules: {
    title: 'required|string',
    exercice: 'required|string',
    difficulty: 'required|string',
    course: 'required|string',
    moduleId: 'required|sring'
  },
  messages: {
    'title.required': 'Un titre est requis',
    'exercice.required': 'Un exercice est requis',
    'difficulty.required': 'Une difficulté est requise',
    'course.required': 'Un cours est requise',
    'moduleId.required': 'Un module doit être associé'
  }
}
const create = async (req, res, next) => {
  try {
    await Request.validator(req.body, validation.rules, validation.messages)
    const data = await Request.values(req.body, fields)

    res.json({ success: true })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default create
