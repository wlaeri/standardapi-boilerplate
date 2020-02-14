import React from 'react'
import Head from 'next/head'
import { Provider, Read } from 'react-standardapi'
import client from '../components/client'

const params = {
  limit: 5,
  include: {
    space: {
      building: true
    }
  }
}

const Home = () => {
  return (
    <Provider client={client}>
      <Read baseModel='availabilities' params={params}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <div>Error...</div>
          return (
            <div>
              {
                data.map(a => <div>{ a.id }</div>)
              }
            </div>
          )
        }}
      </Read>
    </Provider>
  )
}

export default Home
