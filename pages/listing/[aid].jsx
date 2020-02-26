import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Read, useRead } from 'react-standardapi'
import styled from 'styled-components'
import _get from 'lodash/get'
import { BackgroundImage, Heading, Text, Card, Flex } from 'pcln-design-system'
import { getPhotoUrls, getAddress } from '../../utils'
import { Button, Loader } from 'cinderblock'

const params = {
  include: {
    photos: true,
    space: {
      building: {
        photos: true,
        address: true
      }
    }
  }
}

const Gallery = styled(Flex)`
  flex-wrap: wrap;
`  

const Photo = ({ image }) => (
  <Card m={2} height="225px" width="300px">
    <BackgroundImage height="225px" image={image} />
  </Card>
)

const Listing = () => {
  const router = useRouter()
  const id = router.query.aid
  return (
    <Flex p={3}>
      <Read baseModel='availabilities' params={{ ...params, id }}>
        {({ data, loading, error, refetch }) => {
          if (loading) return (
            <Flex p={4} alignItems="center" justifyContent="center">
              <Loader />
            </Flex>
          )
          if (error) return (
            <Flex flexDirection="column">
              <div>Error :(</div>
              <Button onClick={refetch}>Reload</Button>
            </Flex>
          )

          const city = _get(data, 'space.building.address.city')
          const address = getAddress(data)
          const { size, size_units } = data

          const photos = getPhotoUrls(data, { resize: "300x225*" })

          return (
            <Flex>
              <Head flexDirection="column">
                <title>{ address }</title>
              </Head>
              <Heading>{ address }</Heading>
              <Text>{ `${city}  |  ${size} ${size_units}` }</Text>
              <Gallery mt={2} mb={2}>
              {
                photos.map(url => <Photo image={url} />)
              }
              </Gallery>
              <Button onClick={refetch}>Reload</Button>
            </Flex>
          )
        }}
      </Read>
    </Flex>
  )
}

const ListingWithHooks = () => {
  const router = useRouter()
  const id = router.query.aid
  const { loading, error, data, refetch } = useRead('availabilities', { ...params, id})
  if (loading) return (
    <Flex p={4} alignItems="center" justifyContent="center">
      <Loader />
    </Flex>
  )
  if (error) return (
    <Flex flexDirection="column">
      <div>Error :(</div>
      <Button onClick={refetch}>Reload</Button>
    </Flex>
  )

  const city = _get(data, 'space.building.address.city')
  const address = getAddress(data)
  const { size, size_units } = data

  const photos = getPhotoUrls(data, { resize: "300x225*" })

  return (
    <Flex flexDirection="column" p={3}>
      <Head>
        <title>{ address }</title>
      </Head>
      <Heading>{ address }</Heading>
      <Text>{ `${city}  |  ${size} ${size_units}` }</Text>
      <Gallery mt={2} mb={2}>
      {
        photos.map(url => <Photo image={url} />)
      }
      </Gallery>
      <Button onClick={refetch}>Reload</Button>
    </Flex>
  )
}

export default ListingWithHooks
