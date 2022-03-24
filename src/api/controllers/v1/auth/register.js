import bcrypt from 'bcrypt'
import moment from 'moment'

import { validations } from 'indicative/validator'
import Person from '@models/person'

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

const generateAvatar = () => {
  const index = Math.floor(Math.random() * (12 - 1 + 1) + 1)
  return `https://wizzer-teacher.s3.eu-west-3.amazonaws.com/kidaha-${index > 9 ? index : `0${index}`}.png`
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
    if (person) {
      return next(new ValidationError('Un compte avec cet email existe déjà'))
    }
    // Initialisation du compte avec les valeurs par défaut
    person = new Person({
      isActive: true,
      lastLogin: new Date(),
      picture: generateAvatar()
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
    // delete person.photo

    // Enregistrement
    await person.save()

    // Initialisation de la session
    // await Session.generate(person._id)

    // // Création du token
    // const $token = await Session.jwt(person._id)

    return res.json({
      success: true
    })
  } catch (err) {
    return next(err)
  }
}
