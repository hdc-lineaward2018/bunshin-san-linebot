import { parse } from 'url'

const uri = process.env.DATABASE_ENDPOINT
const parsedUri = parse(uri)

export default {
  protocol: parsedUri.protocol,
  host: parsedUri.host,
  hostname: parsedUri.hostname,
  port: parsedUri.port,
  path: parsedUri.path
}
