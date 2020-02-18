import React from 'react'
import _get from 'lodash/get'
import styled from 'styled-components'
import { Preview } from 'cinderblock'
import { Heading, Card, Text, BackgroundImage, Flex } from 'pcln-design-system'
import Router from 'next/router'
import { getPhotoUrls, getAddress } from '../utils'

const AvailabilityContainer = styled(Card)`
  height: 120px;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: row;
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

  const city = _get(availability, 'space.building.address.city')
  const address = getAddress(availability)
  const { size, size_units, id } = availability
  const handleNavigation = () => Router.push('/listing/[aid]', `/listing/${id}`)

  const photos = getPhotoUrls(availability, { resize: "300x225*" })
  
  return (
    <AvailabilityContainer onClick={handleNavigation} mb={2}>
      <BackgroundImage image={photos[0]} height="120px" width="160px" />
      <Flex flexDirection="column" p={2}>
        <Heading>{ address }</Heading>
        <Text>{ `${city}  |  ${size} ${size_units}` }</Text>
      </Flex>
    </AvailabilityContainer>
  )
}

export default AvailabilityCard
