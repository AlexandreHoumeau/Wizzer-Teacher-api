import schema from './methods'

const model = connections.mongoApps.model('Session', schema)

export default model
