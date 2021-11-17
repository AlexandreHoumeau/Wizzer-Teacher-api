import dotenv from 'dotenv'

dotenv.config()

export const env = process.env.NODE_ENV || 'local'

export const ext = env === 'production' ? 'fr' : env === 'staging' ? 'io' : 'dev'

export const googleShortener = {
  key: process.env.GOOGLESHORTENER
}

export const googleKeys = {
  clientEmail: process.env.GOOGLE_CLIENT_EMAIL
  // privateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
}

export const jwt = {
  secret: process.env.JWT_SECRET,
  expires: '7d'
}

export const authenticatorJWT = {
  secret: process.env.JWT_AUTHENTICATOR_SECRET,
  expires: '10m'
}

export const session = {
  secret: process.env.SESSION_SECRET
}

export const sendinblue = {
  apiKey: process.env.SENDINBLUE
}

export const imap = {
  // password boite mail : 'iirGQNkXa91V8Jh'
  user: process.env.IMAP_USER,
  password: process.env.IMAP_PASS
}

export const hellowork = {
  apikey: process.env.HELLOWORK
}

export const stripeKeys = {
  PARIS: process.env.STRIPEKEY_PARIS,
  REGION: process.env.STRIPEKEY_REGION,
  EBIZ: process.env.STRIPEKEY_EBIZ
}

export const hubspot = {
  apiKey: process.env.HUBSPOT
}

export const edusign = {
  apiKey: process.env.EDUSIGN
}

export const luminati = {
  username: process.env.LUMINATI_USER,
  password: process.env.LUMINATI_PASS
}

export const captcha = {
  id: process.env.CAPTCHA_ID,
  token: process.env.CAPTCHA_TOKEN
}

export const aws = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKeyId: process.env.SECRET_ACCESS_KEY_ID
}

export const databases = {
  mongoDev: {
    host: process.env.MONGO_DEV,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },

  mongoApps: {
    host: process.env.MONGO_APPS,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },

  elasticsearch: {
    cloud: {
      id: process.env.ELASTICSEARCH_CLOUD
    },
    auth: {
      apiKey: {
        id: process.env.ELASTICSEARCH_ID,
        api_key: process.env.ELASTICSEARCH_APIKEY
      }
    }
  },

  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASS
  }
}
