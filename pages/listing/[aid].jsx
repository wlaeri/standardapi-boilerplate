import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Provider, Read } from 'react-standardapi'
import client from '../../components/client'
import styled from 'styled-components'
import _get from 'lodash/get'
import { ThemeProvider } from 'pcln-design-system'
import { theme } from 'cinderblock'

const params = {
  include: {
    space: {
      building: {
        address: true
      }
    }
  }
}

const ListingContainer = styled.div`
  padding: 16px;
`

const Listing = () => {
  const router = useRouter()
  const id = router.query.aid
  return (
    <ThemeProvider theme={theme}>
      <ListingContainer>
        <Provider client={client}>
          <Read baseModel='availabilities' params={{ ...params, id }}>
            {({ data, loading, error, refetch }) => {
              if (loading) return <div>Loading...</div>
              if (error) return <div>Error :(</div>

              const address = _get(data, 'space.building.address')
              const { size, size_units, premise, id } = data
              const fullAddress = `${address.number} ${address.street} ${premise}`

              return (
                <div>
                  <Head>
                    <title>{ fullAddress }</title>
                  </Head>
                  <h1>{ fullAddress }</h1>
                  <button onClick={refetch}>Reload</button>
                </div>
              )
            }}
          </Read>
        </Provider>
      </ListingContainer>
    </ThemeProvider>
  )
}

export default Listing
