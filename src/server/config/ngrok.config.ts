import { resolve } from 'path'

export default {
  authtoken: process.env.NGROK_AUTHTOKEN,
  binPath: (path: string) => resolve('ngrok/bin')
}
