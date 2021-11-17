// // eslint-disable-next-line import/named
// import Task from '@models/task'
// import Person from '@models/person'

// export default async function (id) {
//   try {
//     const person = await Person.findById(id).exec()

//     if (!person) {
//       throw new NotFoundError('Aucune personne trouvée avec cet identifiant')
//     }

//     const task = new Task({
//       type: 'transacEmail',
//       data: {
//         templateId: 455,
//         to: [{ email: person?.email }],
//         params: {
//           CIVILITY: person?.civility
//         }
//       }
//     })

//     await task.save()
//   } catch (err) {
//     throw new CatchError(err)
//   }
// }
