import { Schema } from 'mongoose'

// STRING
export const string = { type: String }
export const trimmedString = { ...string, trim: true }
export const lowerCaseString = { ...trimmedString, lowercase: true }
export const siretString = { ...trimmedString }
export const emailString = {
  ...lowerCaseString,
  required: true,
  unique: true,
  match: /^([\w-]+(?:\.[\w-]+)*)(\+[\w.-]+)?@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,63}(?:\.[a-z]{2})?)$/i
}
export const passwordString = {
  ...trimmedString,
  select: false,
  minlength: 32,
  maxlength: 60
}
export const token = {
  ...trimmedString,
  minlength: 60,
  maxlength: 60
}

// NUMBER
export const number = { type: Number }
export const phoneNumber = { ...string, minLength: 4, maxLength: 20, set: (v) => v && v.replace(/ /g, '') }

// DATE
export const date = { type: Date }
export const dateDefault = { ...date, default: Date.now }

// BOOLEAN
export const boolean = { type: Boolean }
export const falseBoolean = { ...boolean, default: false }
export const trueBoolean = { ...boolean, default: true }

// MIXED
export const mixed = { type: Schema.Types.Mixed }

// Validation

export const tag = { ...trimmedString, enum: ['smart', 'pop', 'pop+', 'replacement', 'manager', 'open', 'intra', 'inter', 'elearning', 'assessment', 'saleskit']}
export const slug = { ...trimmedString, enum: ['course', 'pop', 'display', 'smart', 'test', 'saleskit']}
export const price = { ...number, min: [1, 'Le prix doit être supérieur ou égal à 1']}

export const tags = (t) => [{ ...trimmedString, enum: t }]

// GARDER L ORDRE D'AVANCÉE
const levels = [
  'VERIFICATION',
  'CONFIRMATION',
  'PLUS TARD',
  'CV',
  'PRISE DE RDV',
  'RDV',
  'STAND BY',
  'SHORTLIST',
  'CLIENT',
  'CLIENT N1',
  'CLIENT N2',
  'CLIENT N3',
  'CLIENT N4',
  'CLIENT N5',
  'PROPALE'
]

export const level = { ...trimmedString, default: 'CV', enum: levels }

const products = [
  'recrutement', 'smart', 'distribo', 'others', 'succes', 'pop+', 'pop', 'display', 'management',
  'formation', 'presentiel', 'intra', 'inter',
  'distance', 'recrute', 'personnalise', 'atelier', 'conference', 'leadership', 'closing', 'prospection', 'workout-gms', 'workout', 'manager', 'interne', 'basics',
  'elearning', 'argumenter', 'vente-valeur', 'prise-rdv', 'social-selling', 'youth', 'impact', 'mental', 'account',
  'entretien', 'macro',
  'assessment', 'digital', 'full', 'light', 'physique',
  'conseil', 'saleskit', 'fac', 'plus', 'audit', 'scan', 'small', 'medium', 'large'
]

export const hubspot = {
  contracts: [
    ...products,
    'replacement', 'opening'
  ],
  invoices: [
    ...products,
    'replacement', 'setup', 'newbiz', 'bonus', 'renew'
  ],
  missions: [
    ...products
  ]
}

export const lists = {
  applications: { levels },
  products,
  contracts: [
    ...hubspot.contracts,
    'prorata'
  ],
  missions: [
    ...hubspot.missions,
    'replacement', 'manager', 'open', 'pack', 'legacy'
  ],
  invoices: [
    ...hubspot.invoices
  ]
}
