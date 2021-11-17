import multer from 'multer'

import v1 from './v1'

const storage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // FILE UPLOAD LIMITED TO 5MB
  }
})

const routeTypes = {
  public: {
    v1: v1.public
  },
  user: {
    v1: v1.user
  },
  client: {
    v1: v1.client
  },
  coach: {
    v1: v1.coach
  },
  admin: {
    v1: v1.admin
  },
  developer: {
    v1: v1.developer
  }
}

function createRoutes(router, controller, { url, routes }, path = '') {
  url = `${path}${url}` // eslint-disable-line no-param-reassign
  routes.forEach((route) => {
    if (route.url) {
      route.url = url + route.url // eslint-disable-line no-param-reassign
      createRoutes(router, controller, route)
    } else if (route.upload) {
      router.route(url)[route.method](storage.single(route.upload), controller.default[route.function])
    } else {
      router.route(url)[route.method](controller.default[route.function])
    }
  })
}

const routes = {}

Object.keys(routeTypes).forEach((routeType) => {
  routes[routeType] = (router) => {
    routeTypes[routeType].v1.forEach((route) => {
      const controller = require(route.controller) // eslint-disable-line global-require, import/no-dynamic-require
      createRoutes(router, controller, route, '/v1')
    })
  }
})

export default routes
