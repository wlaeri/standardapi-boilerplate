import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { Provider, BatchedLoader } from 'react-standardapi'
import client from '../components/client'
import AvailabilityCard from '../components/AvailabilityCard'


const AppContainer = styled.div`
  padding: 16px;
`

const params = {
  where: {
    status: 'available'
  },
  include: {
    space: {
      building: {
        address: true
      }
    }
  }
}

const Home = () => {
  return (
    <Provider client={client}>
      <Head title='Knotel Listings' />
      <AppContainer>
        <h1>Knotel Listings</h1>
        <BatchedLoader baseModel='availabilities' params={params} batchSize={5}>
          {({ data, error, fetchNextBatch }) => {
            if (error) return <div>Error...</div>

            return (
              <div>
                {
                  data.map(a => <AvailabilityCard availability={a} /> )
                }
                <button onClick={fetchNextBatch}>Load More</button>
              </div>
            )
          }}
        </BatchedLoader>
      </AppContainer>
    </Provider>
  )
}

export default Home
