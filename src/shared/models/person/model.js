import schema from './methods'

const model = connections.mongoApps.model('Person', schema)

export default model
