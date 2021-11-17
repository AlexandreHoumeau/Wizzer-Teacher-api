export default async function (email) {
  try {
    const lowerCase = email.toLowerCase()
    const arr = lowerCase.split('@')

    if (arr.length !== 2) {
      throw new Error('Email non valide')
    }

    return arr[1]
  } catch (error) {
    throw new CatchError(error)
  }
}
