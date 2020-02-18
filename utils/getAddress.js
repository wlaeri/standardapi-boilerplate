import _get from 'lodash/get'

const getAddress = availability => {
  const buildingName = _get(availability, 'space.building.name')
  const localPart = _get(availability, 'space.building.addresses[0].local_part')
  const premise = _get(availability, 'space.premise')
  return `${buildingName || localPart} ${premise}`
}

export default getAddress
