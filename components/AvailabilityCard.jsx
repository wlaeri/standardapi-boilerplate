import React from 'react'
import _get from 'lodash/get'
import styled from 'styled-components'
import { Preview } from 'cinderblock'
import { Heading, Card, Text } from 'pcln-design-system'
import Router from 'next/router'

const AvailabilityContainer = styled(Card)`
  height: 120px;
  width: 100%;
  cursor: pointer;
`

const AvailabilityCard = ({ availability }) => {
  if (availability.loading) {
    return (
      <AvailabilityContainer mb={2} p={2}>
        <Preview height="20px" width="240px" mb={2} />
        <Preview height="20px" width="240px" />
      </AvailabilityContainer>
    )
  }

  const address = _get(availability, 'space.building.address')
  const { size, size_units, premise, id } = availability
  const handleNavigation = () => Router.push('/listing/[aid]', `/listing/${id}`)
  
  return (
    <AvailabilityContainer onClick={handleNavigation} mb={2} p={2}>
      <Heading>{ `${address.number} ${address.street} ${premise}` }</Heading>
      <Text>{ `${address.city}  |  ${size} ${size_units}` }</Text>
    </AvailabilityContainer>
  )
}

export default AvailabilityCard
