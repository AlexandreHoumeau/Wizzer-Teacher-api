import SibApiV3Sdk from 'sib-api-v3-sdk'
import { sendinblue as config } from '@shared/config'

const defaultClient = SibApiV3Sdk.ApiClient.instance
const apiKey = defaultClient.authentications['api-key']
apiKey.apiKey = config.apiKey

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail() // SendSmtpEmail | Values to send a transactional email

const sendTransacEmail = async (data) => {
  sendSmtpEmail = { ...data }
  apiInstance.sendTransacEmail(sendSmtpEmail).then((res) => {
    console.log(`API called successfully. Returned data: ${res[0]}`)
  }, (error) => {
    console.error(error)
  })
}

export default { sendTransacEmail }
