// eslint-disable-next-line import/named
export default async function () {
  try {
    return this.constructor.getDomain(this.email)
  } catch (err) {
    throw new CatchError(err)
  }
}
