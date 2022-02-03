import Exercice from '@models/exercices'
import Request from '@utils/request'
import Module from '@models/modules'

const fields = {
  only: [
    'exercice', 'title', 'difficulty', 'course', 'moduleID'
  ]
}

const validation = {
  rules: {
    title: 'required',
    exercice: 'required',
    difficulty: 'required',
    course: 'required',
    moduleID: 'required'
  },
  messages: {
    'title.required': 'Un titre est requis',
    'exercice.required': 'Un exercice est requis',
    'difficulty.required': 'Une difficulté est requise',
    'course.required': 'Un cours est requise',
    'moduleID.required': 'Un module doit être associé'
  }
}

const create = async (req, res, next) => {
  try {
    await Request.validator(req.body, validation.rules, validation.messages)
    const data = await Request.values(req.body, fields)

    const module = await Module.findById(data.moduleID)

    if (!module) {
      return next(new NotFoundError('Aucun module trouvé avec cet identifiant'))
    }

    const newExo = new Exercice({
      ...data,
      _module: data.moduleID
    })

    await newExo.save()

    if (newExo) {
      module._exercices.push(newExo._id)
      await module.save()
    }

    return res.json({ $message: "L'exercie a bien été crée", $success: true })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default create
