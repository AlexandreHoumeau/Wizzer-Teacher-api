export default async function (email, props) {
  try {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    // Init user
    if (email.match(mailformat)) {
      const person = await this
        .findOne({ email: email.toLowerCase() })
        .select('_id')
        .exec()

      if (!person) {
        const user = new this({
          email,
          ...props
        })
        await user.save()

        return {
          id: user._id,
          isNew: true
        }
      }

      return {
        id: person._id
      }
    }

    throw new Error(`Email ${email} au mauvais format.`)
  } catch (error) {
    throw new CatchError(error)
  }
}
