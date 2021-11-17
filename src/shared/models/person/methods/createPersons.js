// eslint-disable-next-line import/named
import Person from '@models/person'

const createPerson = async (email, source) => {
  let person = await Person
        .findOne({ email: email.toLowerCase() })
        .select('_id')
        .exec()
  if (!person) {
    person = new Person({
      email,
      source
    })
    await person.save()
  }
  return person._id
}

export default async function (emails = [], source) {
  try {
    const notEmpty = emails.filter((a) => a)
    const uniqueEmails = [...new Set(notEmpty)]
    return Promise.all(uniqueEmails.map((email) => createPerson(email, source)))
  } catch (err) {
    throw new CatchError(err)
  }
}
