import bcrypt from 'bcrypt'
import Request from '@utils/request'

import Person from '@models/person'
import Session from '@modules/session'

/**
 * TODO: Il faudra ajouter ici l'enregistrement des expoTokens pour mobile
 */

const types = [
  'user'
]

const validation = {
  rules: {
    email: 'required|email',
    password: 'required',
    type: `in:${types.join(',')}`
  },
  messages: {
    'email.required': 'Un email est requis.',
    'email.email': "L'email n'est pas valide.",
    'password.required': 'Un mot de passe est requis;',
    'type.in': "Le type n'est pas correct."
  }
}

const fields = {
  only: ['email', 'password', 'type']
}

const login = async (req, res, next) => {
  try {
    await new Promise((r) => setTimeout(r, 300))
    // console.log(req.body)
    // Validation des champs
    await Request.validator(req.body, validation.rules, validation.messages)

    // Récupération des valeurs
    const values = await Request.values(req.body, fields)

    // Création du filter avec le type
    const filter = {
      email: values.email,
      type: 'user'
    }

    const person = await Person
      .findOne(filter)
      .select('email password isActive')
      .exec()

    // Compte qui n'existe pas
    if (!person) {
      // return res.status(401).json({ error: 'Cet email n\'existe pas dans notre base' })
      return next(new NotFoundError("Cet email n'existe pas dans notre base"))
    }

    // Vérification de l'état du compte pour les comptes non basiques
    // if (!person.isActive) {
    //   return next(new ValidationError("Le compte n'est plus actif"))
    // }

    // Vérification du mot de passe
    const match = await bcrypt.compare(values.password, person.password)
    if (!match) {
      return next(new ValidationError('Erreur de mot de passe'))
    }

    // Mise à jour des infos de connexion
    // TODO : Il faudrait ajouter un historique des connexion (date, ip, navigateur, ...)
    await Person.updateOne({ _id: person._id }, { $set: { lastLogin: new Date() }})

    // Initialisation de la session
    // await Session.generate(person._id)

    // Génération du token
    const $token = await Session.jwt(person._id)

    // Response
    return res.json({
      $token,
      $message: 'Identification avec succès'
    })
  } catch (error) {
    return next(new CatchError(error))
  }
}

export default login
