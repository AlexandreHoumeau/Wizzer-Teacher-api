export default async (data, { only = [], forbidden = []}, item = null) => {
  try {
    const items = item || {}
    Object.keys(data).forEach((field) => {
      if ((forbidden.indexOf(field) < 0 && (!only.length || only.indexOf(field) > -1)) || ((!only || !only.length) && (!forbidden || !forbidden.length))) {
        if (field === 'email') {
          items[field] = data[field].trim().toLowerCase()
        } else if (typeof data[field] === 'string') {
          items[field] = data[field].trim()
        } else {
          items[field] = data[field]
        }
      }
    })

    return items
  } catch (err) {
    throw new CatchError(err)
  }
}
