import { Schema } from 'mongoose'
import { boolean, date, dateDefault } from '@utils/schemaTypes'
import locals from '@shared/mongoose/locals'

const schema = new Schema({
  _createdAt: dateDefault,
  _updatedAt: dateDefault,
  isOnline: boolean,
  days: [{
    _exercices: [{ type: Schema.Types.ObjectId, ref: 'Exercice' }],
    currentDay: date,
    _tests: [{ type: Schema.Types.ObjectId, ref: 'tests' }]
  }]
})

schema.plugin(locals)

export default schema
