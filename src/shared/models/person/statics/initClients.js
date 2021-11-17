export default async function (emails = [], props) {
  try {
    return Promise.all(emails.map((email) => this.initClient(email, props)))
  } catch (err) {
    throw new CatchError(err)
  }
}
