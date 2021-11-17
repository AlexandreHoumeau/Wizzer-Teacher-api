import { validate } from 'indicative/validator'

export default async (values, rules = [], messages = []) => {
  try {
    await validate(values, rules, messages)
    return true
  } catch (err) {
    console.log('err', err)
    throw new ValidationError(err[0]?.message)
  }
}
