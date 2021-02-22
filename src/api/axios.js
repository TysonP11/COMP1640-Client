import axios from 'axios'
import { BASE_URL as DEV_BASE_URL } from '../environment/dev.env'

let BASE_URL

if (process.env.NODE_ENV === 'development') {
  BASE_URL = DEV_BASE_URL
}

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
