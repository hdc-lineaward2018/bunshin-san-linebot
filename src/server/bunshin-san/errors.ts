import { ErrorResponse } from './responses'

export class DatabaseError extends Error {
  constructor(response: ErrorResponse) {
    super(`An error response was returned from the database. For details, refer to the following: ${response.result}`)
    this.name = 'DatabaseError'
  }
}
