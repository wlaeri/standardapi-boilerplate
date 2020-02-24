import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Read } from 'react-standardapi'
import styled from 'styled-components'
import _get from 'lodash/get'
import { BackgroundImage, Heading, Button, Text, Card, Flex } from 'pcln-design-system'
import { getPhotoUrls, getAddress } from '../../utils'

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
          if (loading) return <div>Loading...</div>
          if (error) return <div>Error :(</div>

          const city = _get(data, 'space.building.address.city')
          const address = getAddress(data)
          const { size, size_units } = data

          const photos = getPhotoUrls(data, { resize: "300x225*" })

          return (
            <div>
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
            </div>
          )
        }}
      </Read>
    </Flex>
  )
}

export default Listing
