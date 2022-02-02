import { Schema } from 'mongoose'
import { dateDefault, number, trimmedString } from '@utils/schemaTypes'
import locals from '@shared/mongoose/locals'

const schema = new Schema({
  // Informations
  title: trimmedString,

  // Course
  googleDocCourse: trimmedString,
  markdownCourse: trimmedString,
  textCourse: trimmedString,

  // Exercice
  googleDocExercice: trimmedString,
  markdownExercice: trimmedString,
  textExercice: trimmedString,

  points: number,

  // Details
  _createdAt: dateDefault,

  // Liaisons
  // _sessions: { type: Schema.Types.ObjectId, ref: 'Sessions' },
  _module: { type: Schema.Types.ObjectId, ref: 'Modules' }
})

schema.plugin(locals)

export default schema
