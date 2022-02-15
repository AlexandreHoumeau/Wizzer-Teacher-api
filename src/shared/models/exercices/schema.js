import { Schema } from 'mongoose'
import { dateDefault, number, trimmedString } from '@utils/schemaTypes'
import locals from '@shared/mongoose/locals'

const schema = new Schema({
  // Informations
  title: trimmedString,

  // Course
  course: trimmedString,

  // Exercice
  exercice: trimmedString,
  difficulty: trimmedString,

  points: number,

  // Details
  _createdAt: dateDefault,

  // Liaisons
  _tests: [{ type: Schema.Types.ObjectId, ref: 'Test' }],
  _module: { type: Schema.Types.ObjectId, ref: 'Modules' }
})

schema.plugin(locals)

export default schema
