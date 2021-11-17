import { Schema } from 'mongoose'
import { date, dateDefault, mixed, emailString, phoneNumber, falseBoolean, trimmedString, passwordString, lowerCaseString, number, boolean } from '@utils/schemaTypes'
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
  civility: trimmedString, // Civilité (Monsieur, Madame)
  firstName: trimmedString, // Prénom
  lastName: trimmedString, // Nom
  phone: phoneNumber, // Numéro de téléphone (avec indicatif (33))
  picture: { ...trimmedString, default: 'https://storage.googleapis.com/split/accounts/profilPicture.png' }, // Photo de profil
  birthdate: date, // Date d'anniversaire
  // seekingStatus: { ...trimmedString, default: 'medium' }, // Statut de recherche d'emplois [high, medium, low, none]
  completion: number, // Pourcentage de completion du profil
  role: lowerCaseString, // Roles (Manager commercial, Consultant...)
  // expoPushTokens: [trimmedString], // Notification Tokens
  about: trimmedString,
  bio: trimmedString,
  details: [trimmedString],
  exp: trimmedString,
  location: {
    presentiel: boolean,
    remote: boolean,
    location: [{
      value: number,
      label: trimmedString
    }]
  },
  // photo: [{
  //   data_url: trimmedString,
  //   file: {
  //     lastModified: trimmedString,
  //     name: trimmedString,
  //     size: number,
  //     type: trimmedString
  //   }
  // }],
  profile: trimmedString,
  sector: trimmedString,
  // secondChance: trueBoolean, // Enable seconde chance
  // search: trueBoolean, // Enable in search

  // informations: { // Trombinoscope profile
  //   arrivalDate: date,
  //   beforeUptoo: trimmedString,
  //   citation: trimmedString,
  //   extra: trimmedString, // hobbies, livres/film préférés etc..
  //   presentation: trimmedString
  // },

  // Etats
  // isHired: falseBoolean, // A été embauché
  // isShortlisted: falseBoolean, // A été shortlisté
  // isDisrupted: falseBoolean, // A été redlisté
  // isAssessed: falseBoolean, // A été évalué
  // inProcess: falseBoolean, // Est en process actuellement
  // isActive: falseBoolean, // Compte actif / inactif

  // Informations
  type: { ...lowerCaseString, default: 'user' }, // guest, user, client, admin, developer
  // tags: [trimmedString], // candidate, coach, attendee, client, diagnostic, assessment, employee, prospect, recruiter, assessed, smart, pop, display, elearning, training, presential
  // source: trimmedString, // UTM_SOURCE
  // medium: trimmedString, // UTM_MEDIUM
  // campaign: trimmedString, // UTM_CAMPAIGN
  // ip: trimmedString, // Adresse ip lors de la création du compte

  // Tokens
  tokens: {
    activation: trimmedString, // Token d'activation du compte
    password: trimmedString, // Token de reset password
    sms: trimmedString,
    email: trimmedString
  },

  // monitoring: trimmedString, // Application monitoring
  // referenceType: trimmedString, // Type de PDR créées par le candidat
  // question: trimmedString, // Question personnalisée PDR : intégrée aux nouvelles PDR créées par le candidat

  authenticator: {
    secret: mixed,
    isEnabled: falseBoolean
  },

  // Management
  // listenings: {
  //   skills: [trimmedString], // Compétences des listens
  //   results: [{ type: Schema.Types.ObjectId, ref: 'Listening' }] // Résultats
  // },

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
  // hubspot: {
  //   userId: trimmedString,
  //   ownerId: trimmedString,
  //   contactId: trimmedString
  // },
  // edusign: {
  //   professorId: trimmedString,
  //   studentId: trimmedString
  // },

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

  // Notifications
  // notifications: {
  //   client: trimmedString,
  //   missions: trimmedString, // null, recap, automatic
  //   selection: trimmedString,
  //   interviews: trimmedString,
  //   applications: trimmedString
  // },

  // Preferences
  // newsletters: {
  //   marketing: falseBoolean, // Etudes Salaires, marché emploi... LIST 163
  //   jobAlert: falseBoolean, // ALERTE JOB HEBDO LIST 164
  //   hunts: falseBoolean, // MAILS DE CHASSE LIST 162
  //   monitoring: trueBoolean // SUIVI DE CANDIDATURE LIST 161
  // },

  // goals: [
  //   {
  //     _counter: { type: Schema.Types.ObjectId, ref: 'Counter' },
  //     month: number,
  //     year: number,
  //     value: number
  //   }
  // ],
  // feedPreferences: {
  //   companies: { ...trimmedString, default: 'me' }, // COMPANIES I WANT TO SEE [all, team, me]
  //   types: [] // LIST OF ACTIVITY TYPES
  // },

  // turnover: number, // average of experiences, in month
  // writingRate: number, // Writing rate for writers

  // // LISTENS V2 FOR MANAGERS
  // todo: [
  //   {
  //     date, // Date de la todo
  //     content: trimmedString // contenu de la note
  //   }
  // ],

  // // Coachs
  // coach: {
  //   company: trimmedString, // Company for invoicing
  //   address: trimmedString, // Address for invoicing
  //   price: number, // Price for session slot
  //   contractDate: date, // Contract date
  //   zoom: {
  //     iv: trimmedString, // Iv to decrypt the token
  //     key: trimmedString, // Key to decrypt the token
  //     encryptedData: trimmedString, // Encrypted token
  //     email: trimmedString // Email zoom account
  //   }
  // }
})

schema.plugin(locals)

export default schema
