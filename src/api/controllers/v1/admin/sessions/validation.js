const validations = {
  create: {
    rules: {
      days: 'required|array'
    },
    messages: {
      'days.required': 'Parameters days is required',
      'days.array': 'Days must be an array'
    }
  }
}

export default validations
