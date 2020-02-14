import StandardAPIClient from 'standardapi-client'

const client = new StandardAPIClient({
  baseURL: process.env.BASE_URL,
  headers: {
    'Api-Key': process.env.API_KEY,
    'Api-Version': process.env.API_VERSION,
    'X-Requested-With': 'XMLHttpRequest'
  }
})

export default client
