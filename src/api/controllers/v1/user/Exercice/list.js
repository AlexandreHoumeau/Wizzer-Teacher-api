import Exercice from '@models/exercices'
import Request from '@utils/request'

const list = async (req, res, next) => {
  try {
    const query = await Request.query(req)
    const exercices = await Exercice.find(query.$filter)
    .populate(query.$populate)

    const exoReducer = exercices.reduce((acc, exo) => {
      acc.push({
        _id: exo._id,
        difficulty: exo.difficulty,
        points: exo.points,
        title: exo.title,
        module: exo._module.title,
        test: exo._tests.find((t) => String(t._user) === String(req.user._id))
      })

      return acc
    }, [])

    return res.json({ exercices: exoReducer })
  } catch (error) {
    console.log(error)
    return next(new CatchError(error))
  }
}

export default list
