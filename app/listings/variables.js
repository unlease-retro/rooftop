import { AREAS } from './constants'

const variables = {

  initialVariables: {
    bot: false,
    listed: true,
    startDateInNextDays: 90,
    radius: 21,
    lng: null,
    lat: null,
    area: 'anywhere',
    hostStatus: 'unspecified',
    popular: 'unspecified',
  },

  prepareVariables: ({ area, ...prevVariables }) => {

    return {
      area,
      ...prevVariables,
      ...AREAS[area],
    }

  }

}

export default variables
