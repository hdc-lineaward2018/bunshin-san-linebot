import { IncomingMessage } from 'http'
import { RequestOptions, request } from 'https'
import { URLSearchParams, parse } from 'url'
import logger from './logger'
import HTTPError from './errors/http-error'

export default class HTTP {
  static async request(options: RequestOptions, data?: any) : Promise<any> {
    return new Promise((resolve: (value: any) => void, reject: (reason: Error) => void) : void => {
      logger.debug(`Request detail: ${JSON.stringify(options)}`)

      const req = request(options, (response: IncomingMessage) : void => {
        logger.debug(`Response status ${response.statusCode}`)

        // redirect
        if(response.statusCode === 302) {
          this.request(parse(response.headers.location)).then((res: any) => {
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

          let parsedData
          try {
            parsedData = data ? JSON.parse(data) : null
          }
          catch(error) {
            reject(error)
          }

          if(response.statusCode >= 400) {
            reject(new HTTPError('Raise error while sending request to database', parsedData))
          }
          else {
            resolve(parsedData)
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

  static async get(options: RequestOptions, data?: URLParams) : Promise<any> {
    const params = data ? '?' + new URLSearchParams(data).toString() : ''
    const path = options.path ? `${options.path}${params}` : params
    const opt = Object.assign({}, options, {method: 'GET', path})
    return this.request(opt)
  }

  static async post(options: RequestOptions, data?: any) : Promise<any> {
    const opt = Object.assign({}, options, {method: 'POST'})
    return this.request(opt, data)
  }
}

export interface URLParams {
  [key: string]: string | string[]
}
