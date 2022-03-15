import { Schema } from 'mongoose'
import { date, dateDefault } from '@utils/schemaTypes'
import locals from '@shared/mongoose/locals'

const schema = new Schema({
  _createdAt: dateDefault,
  _updatedAt: dateDefault,

  days: [{
    _exercices: [{ type: Schema.Types.ObjectId, ref: 'Exercice' }],
    currentDay: date,
    _tests: [{ type: Schema.Types.ObjectId, ref: 'tests'}]
  }]
})

schema.plugin(locals)

export default schema
