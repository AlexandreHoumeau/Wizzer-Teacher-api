export default async function (email, props) {
  try {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    // Init user
    if (email.match(mailformat)) {
      const person = await this
        .findOne({ email: email.toLowerCase() })
        .select('_id type')
        .exec()

      if (!person) {
        const client = new this({
          email,
          type: 'client',
          ...props
        })
        await client.save()

        return {
          id: client._id,
          isNew: true
        }
      }

      if (person.type === 'user') {
        person.type = 'client'
        await person.save()
      }

      await person.save()

      return {
        id: person._id
      }
    }

    throw new Error(`Email ${email} au mauvais format.`)
  } catch (error) {
    throw new CatchError(error)
  }
}
