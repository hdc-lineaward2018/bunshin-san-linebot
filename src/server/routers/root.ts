import { Router, Request, Response } from 'express'
import linebotMiddleware from '../linebot/middleware'
import bunshinMiddleware from '../bunshin-san/middleware'

const router = Router()

router.get('/', (request: Request, response: Response) => {
  return response.send('Server is running .')
})

router.post('/', linebotMiddleware, bunshinMiddleware)

export default router
