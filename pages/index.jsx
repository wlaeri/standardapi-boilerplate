import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { BatchedLoader } from 'react-standardapi'
import { Flex, Heading, Button } from 'pcln-design-system'
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
        photos: true,
        address: true
      }
    },
    photos: true
  }
}

const Home = () => (
  <>
    <Head>
      <title>Knotel Availabilities</title>
    </Head>
    <AppContainer>
      <BatchedLoader baseModel='availabilities' params={params} batchSize={5}>
        {({ data, error, fetchNextBatch }) => {
          if (error) return <Heading>Error...</Heading>

          return (
            <Flex flexDirection="column">
              {
                data.map(a => <AvailabilityCard availability={a} key={a.id} /> )
              }
              <Button onClick={fetchNextBatch}>Load More</Button>
            </Flex>
          )
        }}
      </BatchedLoader>
    </AppContainer>
  </>
)

export default Home
