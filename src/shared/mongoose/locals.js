function locals(schema) {
  schema.pre('save', function (next) {
    try {
      this.$locals.wasNew = this.isNew
      this.$locals.pathsModified = this.modifiedPaths() || []
      this.$locals.pathsModifiedFull = this.modifiedPaths({ includeChildren: true }) || []
      return next()
    } catch (err) {
      throw new CatchError(err)
    }
  })
}

export default locals
