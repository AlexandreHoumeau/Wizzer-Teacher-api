import Modules from '@models/modules'
import Request from '@utils/request'

const fields = {
  only: [
    'title', 'descriptions', 'score'
  ]
}

export default async (req, res, next) => {
  try {
    const data = await Request.values(req.body, fields)
    const module = await Modules.find({
      title: data.title
    })

    if (module) {
      return next(new CatchError('Un module existe déja avec ce nom'))
    }

    const newModules = new Modules({
      title: data.title,
      description: data.description
    })

    await newModules.save()

    return res.json({ success: true })
  } catch (err) {
    return next(err)
  }
}
