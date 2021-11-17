import useragent from 'useragent'
import device from 'device'

export default (req) => {
  // Calcul de l'adresse UP
  let ip = req.connection ? req.connection.remoteAddress : null

  ip = req.headers && req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'] : ip

  if (ip && ip.substr(0, 7) === '::ffff:') {
    ip = ip.substr(7)
  }

  // Agence
  const agent = req.headers && req.headers['user-agent'] ? useragent.parse(req.headers['user-agent']) : null
  const deviceRequest = req.headers && req.headers['user-agent'] ? device(req.headers['user-agent']) : null

  const data = {
    ip,
    browser: agent ? agent.family.toLowerCase() : null,
    device: deviceRequest ? deviceRequest.type : null,
    userAgent: req.headers && req.headers['user-agent'] ? req.headers['user-agent'] : null,
    url: decodeURIComponent(req.url),
    params: req.params || null,
    query: req.query || null,
    body: req.body || null
  }

  return data
}
