import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Provider, Read } from 'react-standardapi'
import client from '../../components/client'
import styled from 'styled-components'
import _get from 'lodash/get'

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
    <ListingContainer>
      <Provider client={client}>
        <Read baseModel='availabilities' params={{ ...params, id }}>
          {({ data, loading, error, refetch }) => {
            if (loading) return <div>Loading...</div>
            if (error) return <div>Error :(</div>

            const address = _get(data, 'space.building.address')
            const { size, size_units, premise, id } = data

            return (
              <div>
                <h1>{ `${address.number} ${address.street} ${premise}` }</h1>
                <button onClick={refetch}>Reload</button>
              </div>
            )
          }}
        </Read>
      </Provider>
    </ListingContainer>
  )
}

export default Listing
