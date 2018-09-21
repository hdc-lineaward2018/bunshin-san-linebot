import { resolve } from 'path'

export default {
  authtoken: process.env.NGROK_AUTHTOKEN,
  binPath: (path: string) => {
    return resolve('./node_modules/ngrok/bin')
  }
}
