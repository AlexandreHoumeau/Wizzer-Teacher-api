export const parseJSON = (object) => {
  try {
    const parsed = JSON.parse(object)
    return parsed
  } catch (err) {
    return object
  }
}
export default parseJSON
