import moment from 'moment'

const timestamps = function (schema) {
  schema.pre('save', function (next) {
    if (this.isNew === true && !this._createdAt) {
      this._createdAt = moment()
    }
    this._updatedAt = moment()
    next()
  })
}

export default timestamps
