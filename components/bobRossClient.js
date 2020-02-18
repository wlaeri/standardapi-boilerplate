import BobRossClient from 'bob-ross-client'
import hmacs from './hmacs.json'

const client = new BobRossClient({
  serverUrl: process.env.BOB_ROSS_SERVER_URL,
  hmacs
})

export default client
