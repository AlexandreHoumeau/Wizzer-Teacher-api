import schema from './schema'
// // import moment from 'moment'
// // import Mission from '@models/mission'
// // import Task from '@models/task'
// // import { personModel as Person } from '.'
// // import Session from '../../services/session'
// // import completion from '../../utils/completion'
// // import { logError } from '../../utils/log'
// // import sibSenders from '../../services/sendinblue/senders'
// // import IndexHubspotCompanies from '../../elasticsearch/hubspot/companies'

// import initProfile from './middlewares/pre/initProfile'

// import preUpdateLastActionAndCompletion from './middlewares/preUpdateLastActionAndCompletion'
// import preAddTagEmployee from './middlewares/preAddTagEmployee'
// import preAddTagWriter from './middlewares/preAddTagWriter'
// import preAddTagProspect from './middlewares/preAddTagProspect'
// import postCheckSessionRefresh from './middlewares/postCheckSessionRefresh'
// import postCheckSessionDelete from './middlewares/postCheckSessionDelete'
// import postInactiveManager from './middlewares/postInactiveManager'
// import postUpdateSessionFeed from './middlewares/postUpdateSessionFeed'
// import postUpdateSibSender from './middlewares/postUpdateSibSender'
// import postUpdateIsActiveES from './middlewares/postUpdateIsActiveES'

// import hubspot from './middlewares/hubspot'
// import elasticsearch from './middlewares/elasticsearch'

// // Pre save
// schema.pre('save', initProfile)
// schema.pre('save', preUpdateLastActionAndCompletion)
// schema.pre('save', preAddTagEmployee)
// schema.pre('save', preAddTagWriter)
// schema.pre('save', preAddTagProspect)

// // Post save
// schema.post('save', postCheckSessionRefresh)
// schema.post('save', postCheckSessionDelete)
// schema.post('save', postInactiveManager)
// schema.post('save', postUpdateSessionFeed)
// schema.post('save', postUpdateSibSender)
// schema.post('save', postUpdateIsActiveES)
// schema.post('save', hubspot.createContactPostSave)
// schema.post('save', elasticsearch.syncAssessedPostSave)

export default schema
