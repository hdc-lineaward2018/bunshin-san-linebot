import { IncomingMessage } from 'http'
import { RequestOptions, request } from 'https'
import { URLSearchParams, parse } from 'url'
import { HTTPError } from '@line/bot-sdk'
import logger from './logger'

export default class HTTP {
  static async request(options: RequestOptions, data?: any) : Promise<Response> {
    return new Promise((resolve: (value: Response) => void, reject: (reason: Error) => void) : void => {
      logger.debug(`Request detail: ${JSON.stringify(options)}`)

      const req = request(options, (response: IncomingMessage) : void => {
        logger.debug(`Response status ${response.statusCode}`)

        // resume receiving response if error
        if(response.statusCode >= 400) {
          response.resume()
          reject(new HTTPError('Raise error while sending request to database', response.statusCode, response.statusMessage, null))
          return
        }

        // redirect
        if(response.statusCode === 302) {
          this.request(parse(response.headers.location)).then((res: Response) => {
            resolve(res)
          }).catch((reason: Error) => {
            reject(reason)
          })
          return
        }

        let data = ''

        // receive response body stream
        response.on('data', (chunkedData: string) : void => {
          data += chunkedData
        })

        // complete to recive response body
        response.on('end', () : void => {
          logger.debug(`Database Response ended .`)
          logger.debug(`Responsed data: ${data}`)
          try {
            resolve(data ? <Response>JSON.parse(data) : null)
          }
          catch(error) {
            reject(error)
          }
        })

        // handle error
        response.on('error', (error: Error) : void => {
          reject(error)
        })
      })

      req.on('error', (error: Error) : void => {
        reject(error)
      })

      req.end(JSON.stringify(data), () => {
        logger.debug(`Send request to ${options.hostname}${options.path}.`)
      })
    })
  }

  static async get(options: RequestOptions, data?: URLParams) : Promise<Response> {
    const params = data ? '?' + new URLSearchParams(data).toString() : ''
    const path = options.path ? `${options.path}${params}` : params
    const opt = Object.assign({}, options, {method: 'GET', path})
    return this.request(opt)
  }

  static async post(options: RequestOptions, data?: any) : Promise<Response> {
    const opt = Object.assign({}, options, {method: 'POST'})
    return this.request(opt, data)
  }
}

export interface URLParams {
  [key: string]: string | string[]
}
