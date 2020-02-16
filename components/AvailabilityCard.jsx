import React from 'react'
import _get from 'lodash/get'
import styled from 'styled-components'
import Link from 'next/link'

const AvailabilityContainer = styled.div`
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 8px;
  height: 120px;
`

const Title = styled.h2`
  cursor: pointer;
`

const AvailabilityCard = ({ availability }) => {
  if (availability.loading) {
    return (
      <AvailabilityContainer>
        <h1>Loading...</h1>
      </AvailabilityContainer>
    )
  }

  const address = _get(availability, 'space.building.address')
  const { size, size_units, premise, id } = availability
  
  return (
    <AvailabilityContainer>
      <Link key={id} href="/listing/[aid]" as={`/listing/${id}`}>
        <Title>{ `${address.number} ${address.street} ${premise}` }</Title>
      </Link>
      <p>{ `${address.city}  |  ${size} ${size_units}` }</p>
    </AvailabilityContainer>
  )
}

export default AvailabilityCard
