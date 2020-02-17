import React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { Provider, BatchedLoader } from 'react-standardapi'
import { ThemeProvider, Flex, Heading, Button } from 'pcln-design-system'
import { theme, Logo } from 'cinderblock'
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

const Home = () => (
  <ThemeProvider theme={theme}>
    <Provider client={client}>
      <Head>
        <title>Knotel Availabilities</title>
      </Head>
      <Flex alignItems="center">
        <Logo />
        <Heading ml={2}>Availabilities</Heading>
      </Flex>
      <AppContainer>
        <BatchedLoader baseModel='availabilities' params={params} batchSize={5}>
          {({ data, error, fetchNextBatch }) => {
            if (error) return <Heading>Error...</Heading>

            return (
              <Flex flexDirection="column">
                {
                  data.map(a => <AvailabilityCard availability={a} /> )
                }
                <Button onClick={fetchNextBatch}>Load More</Button>
              </Flex>
            )
          }}
        </BatchedLoader>
      </AppContainer>
    </Provider>
  </ThemeProvider>
)

export default Home
