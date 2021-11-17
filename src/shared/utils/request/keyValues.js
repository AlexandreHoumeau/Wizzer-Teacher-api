function setValue(object, key, value) {
  if (typeof value === 'string') {
    object[key] = value.trim()
  } else {
    object[key] = value
  }
}

export default async (datas) => {
  try {
    const data = {}

    datas.forEach(({ key, value }) => {
      const keys = key.split('.')

      if (keys.length === 1) {
        setValue(data, key, value)
      } else if (keys.length === 2) {
        if (!data[keys[0]]) {
          data[keys[0]] = {}
        }
        data[keys[0]][keys[1]] = value
      } else {
        console.warn('keyValues does not supports 3 levels nested objects yet')
      }
    })

    return data
  } catch (err) {
    throw new CatchError(err)
  }
}
