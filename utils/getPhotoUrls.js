import bobRoss from '../components/bobRossClient'
import _get from 'lodash/get'

const getPhotoUrls = (availability, options) => {
  let photos = []
  const availabilityPhotos = availability.photos || []
  const buildingPhotos = _get(availability, 'space.building.photos') || []
  photos = photos.concat(availabilityPhotos).concat(buildingPhotos)
  return photos.map(p => bobRoss.getUrl(p.id, { ...options }))
}

export default getPhotoUrls
