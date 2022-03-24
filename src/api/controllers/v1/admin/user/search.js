import Person from '@models/person'

const Search = async (req, res, next) => {
  try {
    const { keyword } = req.params
    const users = await Person.find({ $text: { $search: keyword }})
    return res.json({ users })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default Search
