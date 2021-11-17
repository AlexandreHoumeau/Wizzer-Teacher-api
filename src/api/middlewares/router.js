/* eslint-disable consistent-return */
import routes from '@api/routes/index'
import jsonwebtoken from 'jsonwebtoken'
import { jwt } from '@shared/config'
// import Session from '@modules/session'
import { VError } from 'verror'

const decodeJwt = (req, res, next) => {
  const header = req?.headers?.authorization

  if (header) {
    const token = header.split(' ').pop()
    if (token) {
      jsonwebtoken.verify(token, jwt.secret, (err, decoded) => {
        if (!err) {
          req.token = token
          req.user = decoded
        }
        return next()
      })
    } else {
      return next()
    }
  } else {
    return next()
  }
}

const authenticate = async (req, res, next) => {
  if (req.user == null) {
    return next(new CatchError({}, "Vous n'êtes pas identifié", 400))
  }
  try {
    // Get Redis Session
    await Session.get(req.user._id)
    return next()
  } catch (err) {
    return next(new CatchError(err))
  }
}

const permit = (router, allowed) => {
  router.use((req, res, next) => {
    if (req.user && allowed.includes(req.user.type)) {
      return next()
    }
    return next(new CatchError({}, "Vous n'avez pas accès", 403))
  })
}

const redirect = async (req, res, next) => {
  const $redirect = req.body.$redirect || req.query.$redirect
  if ($redirect) {
    const { json } = res
    res.json = function (data) {
      json.call(this, {
        $redirect,
        ...data
      })
    }
  }

  return next()
}

const errors = (error, req, res, next) => { // eslint-disable-line no-unused-vars
  // const stack = VError.fullStack(error)
  const { code, message, data } = error
  console.log(message)
  if (data?.notification) {
    return res.status(code).json({
      $notification: data.notification,
      $redirect: undefined
    })
  }
  return res.status(code).json({
    $message: message,
    $redirect: undefined
  })
}

const routerInit = (router) => {
  try {
    // Success ping
    router.route('/').get((req, res) => {
      res.json({ sucess: true })
    })

    // // Decode JWT
    router.use(decodeJwt)
    router.use(redirect)

    // // Public routes
    routes.public(router)

    // // Check User + User routes
    // router.use(authenticate)
    // routes.user(router)

    // // Client routes
    // permit(router, ['client', 'admin', 'developer'])
    // routes.client(router)

    // // Coach routes
    // permit(router, ['coach', 'admin', 'developer'])
    // routes.coach(router)

    // // Admin routes
    // permit(router, ['admin', 'developer'])
    // routes.admin(router)

    // // Developer routes
    // permit(router, ['developer'])
    // routes.developer(router)

    // // Erros Handling
    router.use(errors)

    // 404 Error
    router.use((req, res) => {
      res.status(404).json({
        $message: 'Erreur 404. Page non trouvée'
      })
    })

    return router
  } catch (err) {
    console.log(err)
    // throw new CatchError(err)
  }
}

export default routerInit
