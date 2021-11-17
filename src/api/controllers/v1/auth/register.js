import bcrypt from 'bcrypt'
import moment from 'moment'

import { validations } from 'indicative/validator'
import Person from '@models/person'
import Session from '@modules/session'

import Request from '@utils/request'

const validation = {
  rules: {
    email: 'required|email',
    type: [
      validations.in(['user', 'client'])
    ]
  },
  messages: {
    'email.required': 'Un email est requis',
    'email.email': 'Email non valide',
    'type.in': "Le type de compte n'est pas correct"
  }
}

const fields = {
  only: [
    'email', 'password', 'firstName', 'lastName'
  ]
}

export default async (req, res, next) => {
  try {
    // Validation des champs
    await Request.validator(req.body, validation.rules, validation.messages)
    // Récupération des valeurs
    const values = await Request.values(req.body, fields)
    // Check if person already exists
    let person = await Person
      .findOne({ email: values.email })
      .select('_id type')
      .exec()
    console.log(person)
    if (person) {
      return next(new ValidationError('Un compte avec cet email existe déjà'))
    }
    // Initialisation du compte avec les valeurs par défaut
    person = new Person({
      isActive: true,
      lastLogin: new Date()
    })

    // On valide automatiquement le compte client si c'est spécifié
    if (person.type === 'teacher' && req.body.isVerified) {
      values._verifiedEmail = moment()
    }

    // Set password
    if (values.password) {
      values.password = await bcrypt.hash(values.password, 10)
    } else {
      values.password = undefined
    }

    // Set values
    person.set(values)
    delete person.photo

    // Enregistrement
    await person.save()

    // Initialisation de la session
    await Session.generate(person._id)

    // // Création du token
    const $token = await Session.jwt(person._id)

    return res.json({
      $token
    })
  } catch (err) {
    return next(err)
  }
}
