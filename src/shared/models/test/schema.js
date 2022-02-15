import { Schema } from 'mongoose'
import { dateDefault, trimmedString, number, date } from '@utils/schemaTypes'
import locals from '@shared/mongoose/locals'

const schema = new Schema({
  _startedAt: dateDefault,
  _submitedAt: date,

  _exercice: { type: Schema.Types.ObjectId, ref: 'Exercice' },
  _module: { type: Schema.Types.ObjectId, ref: 'Modules' },
  _user: { type: Schema.Types.ObjectId, ref: 'Person' },

  // Informations
  score: number,
  status: trimmedString, // passed pending refused
  repository: trimmedString
})

schema.plugin(locals)

export default schema
