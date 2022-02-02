import Modules from '@models/modules'
import Request from '@utils/request'

const fields = {
  only: [
    'title', 'description', 'type'
  ]
}

const validation = {
  rules: {
    title: 'required|string',
    type: 'required|string',
    description: 'required|string'
  },
  messages: {
    'title.required': 'Un titre est requis',
    'type.required': 'Un type est requis',
    'description.required': 'Une description est requise'
  }
}

const create = async (req, res, next) => {
  try {
    await Request.validator(req.body, validation.rules, validation.messages)
    const data = await Request.values(req.body, fields)
    const module = await Modules.find({
      title: data.title
    })

    if (module?.length) {
      return next(new CatchError('Un module existe déja avec ce nom'))
    }

    const newModules = new Modules({
      title: data.title,
      description: data.description,
      type: data.type
    })

    await newModules.save()
    return res.json({ $message: 'Module bien enregistré' })
  } catch (err) {
    return next(new CatchError(err))
  }
}

export default create
