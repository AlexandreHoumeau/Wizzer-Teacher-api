import { Schema } from 'mongoose'
import { date, dateDefault, mixed, emailString, falseBoolean, trimmedString, passwordString, lowerCaseString } from '@utils/schemaTypes'
import locals from '@shared/mongoose/locals'

const schema = new Schema({
  // Dates
  _createdAt: dateDefault, // Création du compte
  _lastAction: dateDefault, // Dernière action de la personne
  _lastReferenceRequest: date, // Dernier email de demande de références envoyé à la personne
  _sharedAt: date, // Dernier partage de la personne
  _verifiedEmailAt: date,
  _verifiedPhoneAt: date,

  // Liaisons
  // _applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }], // Candidatures
  // _interviews: [{ type: Schema.Types.ObjectId, ref: 'Interview' }], // Rendez-vous
  // _hunts: [{ type: Schema.Types.ObjectId, ref: 'Hunt' }], // Chasses
  // _offers: [{ type: Schema.Types.ObjectId, ref: 'Offer' }], // Offres visitées
  // _similars: [{ type: Schema.Types.ObjectId, ref: 'Offer' }], // Offres similaires
  // _jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }], // Jobs auxquels il a postulé
  // _assessments: [{ type: Schema.Types.ObjectId, ref: 'Assessment' }], // Assessments auxquels il a participé
  // _trainings: [{ type: Schema.Types.ObjectId, ref: 'Training' }], // Trainings auxquels il a participé
  // _managed: [{ type: Schema.Types.ObjectId, ref: 'Person' }], // Equipes N-1, -2, -3...
  // _listened: [{ type: Schema.Types.ObjectId, ref: 'Person' }], // Equipe direct N-1
  // _manager: { type: Schema.Types.ObjectId, ref: 'Person' }, // Manager de la personne
  // _companies: [{ type: Schema.Types.ObjectId, ref: 'Company' }], // Abonnement aux sociétés
  // _listens: [{ type: Schema.Types.ObjectId, ref: 'Listen' }],
  // _office: { type: Schema.Types.ObjectId, ref: 'Office' },
  // _assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }], // Items de formation interne
  // _dashboards: [{ type: Schema.Types.ObjectId, ref: 'Dashboard' }], // Configuration des dashboards admin

  // Datas
  // _salary: { type: Schema.Types.ObjectId, ref: 'Salary' }, // Rémunération
  // _profile: { type: Schema.Types.ObjectId, ref: 'Profile' }, // Profil
  // _resumes: [{ type: Schema.Types.ObjectId, ref: 'Resume' }], // CV Téléchargés
  // _experiences: [{ type: Schema.Types.ObjectId, ref: 'Experience' }], // Expériences
  // _studies: [{ type: Schema.Types.ObjectId, ref: 'Study' }], // Etudes
  // _languages: [{ type: Schema.Types.ObjectId, ref: 'Language' }], // Niveaux de langues
  // _affinities: [{ type: Schema.Types.ObjectId, ref: 'Affinity' }], // Affinités
  // _scores: [{ type: Schema.Types.ObjectId, ref: 'Score' }], // Scores aux tests
  // _reports: [{ type: Schema.Types.ObjectId, ref: 'Report' }], // Compte-rendus
  // _references: [{ type: Schema.Types.ObjectId, ref: 'Reference' }], // Prises de référence
  // _integrations: [{ type: Schema.Types.ObjectId, ref: 'Integration' }], // Points d'intégration
  // _files: [{ type: Schema.Types.ObjectId, ref: 'File' }], // Fichiers uploadés sur Klimbr

  // Identifiants
  email: emailString, // Adresse email
  password: passwordString, // Mot de passe (bcrypt)

  // Identité
  // civility: trimmedString, // Civilité (Monsieur, Madame)
  firstName: trimmedString, // Prénom
  lastName: trimmedString, // Nom
  picture: { ...trimmedString, default: 'https://storage.googleapis.com/split/accounts/profilPicture.png' }, // Photo de profil

  role: lowerCaseString, // Roles (Manager commercial, Consultant...)

  profile: trimmedString,
  sector: trimmedString,

  // Informations
  type: { ...lowerCaseString, default: 'user' }, // guest, user, client, admin, developer

  // Tokens
  tokens: {
    activation: trimmedString, // Token d'activation du compte
    password: trimmedString, // Token de reset password
    sms: trimmedString,
    email: trimmedString
  },

  authenticator: {
    secret: mixed,
    isEnabled: falseBoolean
  },

  // Linkedin Profile
  linkedinUrl: trimmedString, // Linkedin Url

  // External apis
  linkedinId: trimmedString, // ID Linkedin
  sendInBlue: {
    isSender: falseBoolean // Activation dans sendInBlue
  },
  google: {
    accessToken: trimmedString, // Acces au compte GSuite
    expiresAt: date // Expiration du token
  },

  // Connections
  permissions: [trimmedString], // Nom des permissions

  lastLogin: date, // Dernière connexion

  activation: {
    ip: trimmedString, // Addresse IP de la personne qui a activé le compte
    date // Date d'activation
  },

  connections: [{
    ip: trimmedString, // Adresse IP
    date, // Date de la connexion
    browser: trimmedString, // Navigateur
    device: trimmedString, // Terminal
    location: trimmedString // location of IP
  }],

  ips: [{
    ip: trimmedString, // Adresse IP
    firstDate: date, // Date de la 1er connexion
    lastDate: date, // Date de la dernière connexion
    browser: trimmedString, // Navigateur
    device: trimmedString, // Terminal
    location: trimmedString // location of IP
  }],

  devices: [{
    id: trimmedString,
    type: trimmedString
  }]

})

schema.plugin(locals)

export default schema
