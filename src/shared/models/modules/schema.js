import { Schema } from 'mongoose'
import { dateDefault, falseBoolean, trimmedString, number } from '@utils/schemaTypes'
import locals from '@shared/mongoose/locals'

const schema = new Schema({
  // Informations
  title: trimmedString,
  descriptions: trimmedString,

  score: number, // total point of the module

  // Details
  _createdAt: dateDefault,
  isBattle: falseBoolean,

  // Liaisons
  _exercices: [{ type: Schema.Types.ObjectId, ref: 'Exercice' }]
})

schema.plugin(locals)

export default schema
