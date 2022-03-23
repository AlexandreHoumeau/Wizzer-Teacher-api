import People from '@models/person'
import SIB from '@shared/services/sendinblue/emails'
import bcrypt from 'bcrypt'

function generatePassword() {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const Password = async (req, res, next) => {
  try {
    const { email } = req.body

    const user = await People.findOne({
      email
    })

    if (!user) {
      return next(new NotFoundError('Aucun compte trouvé avec cet email'))
    }

    const newPassword = generatePassword()

    user.password = await bcrypt.hash(newPassword, 10)

    await user.save()

    const data = {
      templateId: 2,
      to: [{ email }],
      params: {
        PASSWORD: newPassword
      }
    }

    await SIB.sendTransacEmail(data)

    return res.json({ $message: 'Un email vous a été envoyé.' })
  } catch (error) {
    console.log(error)
    return next(new CatchError(error))
  }
}

export default Password
