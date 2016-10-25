/**
  * @desc API service - providers an interface to common API methods
*/

import 'whatwg-fetch'

import { API } from '../constants'

// GET
export const get = route => fetch(`${API}/${route}`, { method: 'GET' }).then( res => res.json() )

// POST
export const post = (route, data) => fetch(`${API}/${route}`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
}).then( res => res.json() )
