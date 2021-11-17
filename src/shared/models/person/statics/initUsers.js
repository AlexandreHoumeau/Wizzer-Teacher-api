export default async function (emails = [], props) {
  try {
    return Promise.all(emails.map((email) => this.initUser(email, props)))
  } catch (err) {
    throw new CatchError(err)
  }
}
