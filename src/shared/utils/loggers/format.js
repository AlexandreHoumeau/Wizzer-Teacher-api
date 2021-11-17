export default (item) => {
  const formatted = item
  if (typeof item === 'object') {
    const keys = Object.keys(item)
    keys.forEach((key) => {
      if (typeof item[key] === 'object' && key !== 'tags') {
        formatted[key] = JSON.stringify(item[key])
      } else {
        formatted[key] = item[key]
      }
    })
  }
  return formatted
}
