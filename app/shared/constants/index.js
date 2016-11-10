/**
  * @desc Constants - application constants live here
*/

import { isDevelopment } from '../util'

export const STATE_KEY = '@Rooftop:state'

export const API = isDevelopment ? 'http://localhost:5000/api' : 'https://unrest.unlease.io/api'
export const GRAPHQL_SERVER = isDevelopment ? 'http://localhost:5000/graphql' : 'https://unrest.unlease.io/graphql'
