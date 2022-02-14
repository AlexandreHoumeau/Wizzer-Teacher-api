import schema from './methods'

const model = connections.mongoApps.model('Test', schema)

export default model
