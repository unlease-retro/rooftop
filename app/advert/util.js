/**
  * @desc Advert utility functions
*/

import { LISTING_PREVIEW_URL_PREFIX, LISTING_URL_PREFIX, MAP_URL_PREFIX, MAP_URL_SUFFIX, STATUS_TEXT_COLOURS } from './constants'

export const required = value => value === '' || value === 'unspecified' ? 'Required' : undefined

export const normalize = value => parseInt( value )

export const getListingUrl = id => `${LISTING_URL_PREFIX}${id}`

export const getListingPreviewUrl = listing => `${LISTING_PREVIEW_URL_PREFIX}${ encodeURI(JSON.stringify(listing)) }`

export const getMapUrl = ({ lat, lng }) => `${MAP_URL_PREFIX}${lat},${lng}${MAP_URL_SUFFIX}`

export const getSmsBody = ({ emailAddress, hostName }) => `Hello ${hostName}, your email address is ${emailAddress}`

export const getStatusTextColour = status => STATUS_TEXT_COLOURS[status]

export const getAddressFromGeocode = ({ lat, lng }) => fetch(`http://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
  .then( res => res.json() )
  .then( ({ address: { city, country, postcode, road } }) => ({ city, country, postcode, road }) )

export const transformAdvertToListing = advert => ({
  payload: {
    user: {
      firstName: advert.hostName,
      lastName: '',
      phoneVerification: {
        contactNumber: advert.phoneNumber,
        code: 1111,
        verified: true
      }
    },
    listing: {
      roommate: {
        numOfMale: advert.numOfMale,
        numOfFemale: advert.numOfFemale,
        minAge: 18,
        maxAge: 65,
        occupation: [],
        sectionCompleted: true
      },
      accommodates: 1,
      pricing: {
        weeklyRent: advert.price,
        cleaningFee: 0,
        deposit: 0,
        serviceFee: 0.03,
        extraGuestCharge: 0,
        sectionCompleted: true
      },
      booked: false,
      listed: null,
      referralCode: null,
      completed: true,
      homeTruth: {
        items: [],
        sectionCompleted: true
      },
      photo: {
        imageList: advert.photos.map( p => ({ s3Link: p, name: '' }) ),
        upperLimit: 9,
        lowerLimit: 1,
        sectionCompleted: true
      },
      address: {
        streetAddress: advert.road,
        flatNumber: null,
        city: advert.city,
        country: advert.country,
        postcode: advert.postcode,
        geoLocation: {
          type: 'Point',
          coordinates: [ advert.geocode.lng, advert.geocode.lat ]
        },
        sectionCompleted: true
      },
      roomType: 'double',
      location: `${advert.city}, ${advert.country}`,
      homeType: advert.homeType,
      availability: {
        from: advert.availabilityFrom,
        to: advert.availabilityTo,
        minStay: 21,
        sectionCompleted: true,
      },
      description: {
        title: advert.title,
        description: advert.description,
        amenityItems: [
          {
            name: 'wifi',
            displayName: 'Wi-Fi',
            included: false
          },
          {
            name: 'bedding',
            displayName: 'Bedding',
            included: false
          },
          {
            name: 'washingMachine',
            displayName: 'Washing Machine',
            included: false
          },
          {
            name: 'heater',
            displayName: 'Heater',
            included: false
          },
          {
            name: 'dishwasher',
            displayName: 'Dishwasher',
            included: false
          },
          {
            name: 'towels',
            displayName: 'Towels',
            included: false
          },
          {
            name: 'bicycles',
            displayName: 'Bicycles',
            included: false
          },
          {
            name: 'gym',
            displayName: 'Gym',
            included: false
          },
          {
            name: 'parking',
            displayName: 'Parking',
            included: false
          },
          {
            name: 'fridge',
            displayName: 'Fridge',
            included: false
          }
        ],
        sectionCompleted: true
      }
    }
  }
})

export const transformAdvertToListingPreview = advert => ({
  roommate: {
    numOfMale: advert.numOfMale,
    numOfFemale: advert.numOfFemale,
    minAge: 18,
    maxAge: 65,
    occupation: [],
    sectionCompleted: true
  },
  nonResponsive: false,
  accommodates: 1,
  pricing: {
    weeklyRent: advert.price,
    cleaningFee: 0,
    deposit: 0,
    serviceFee: 0.03,
    extraGuestCharge: 0,
    sectionCompleted: true
  },
  deactivatedBy: null,
  booked: false,
  referralCode: null,
  completed: true,
  homeTruth: {
    items: [],
    sectionCompleted: true
  },
  updatedAt: Date.now(),
  photo: {
    imageList: advert.photos.map( p => ({ s3Link: p, name: '' }) ),
    upperLimit: 9,
    lowerLimit: 1,
    sectionCompleted: true
  },
  updatedBy: 'USER',
  address: {
    streetAddress: advert.road,
    flatNumber: null,
    city: advert.city,
    country: advert.country,
    postcode: advert.postcode,
    geoLocation: {
      x: advert.geocode.lng,
      y: advert.geocode.lat,
      type: 'Point',
      coordinates: [ advert.geocode.lng, advert.geocode.lat ]
    },
    sectionCompleted: true
  },
  embeddedUser: {
    id: '',
    firstName: advert.hostName,
    lastName: '',
    avatar: 'https://assets.unlease.io/static/static-img/default_avatar.png'
  },
  roomType: 'double',
  location: `${advert.city}, ${advert.country}`,
  expiredAt: null,
  homeType: advert.homeType,
  id: '',
  createdAt: Date.now(),
  availability: {
    from: advert.availabilityFrom,
    to: advert.availabilityTo,
    minStay: 21,
    duration: 21,
    bookedDates: [],
    sectionCompleted: true
  },
  availableDates: [
    {
      start: advert.availabilityFrom,
      end: advert.availabilityTo,
      duration: 21,
      validUntil: advert.availabilityTo,
      interval: 21
    }
  ],
  leakage: false,
  description: {
    title: advert.title,
    description: advert.description,
    amenityItems: [
      {
        name: 'wifi',
        displayName: 'Wi-Fi',
        included: false
      },
      {
        name: 'bedding',
        displayName: 'Bedding',
        included: false
      },
      {
        name: 'washingMachine',
        displayName: 'Washing Machine',
        included: false
      },
      {
        name: 'heater',
        displayName: 'Heater',
        included: false
      },
      {
        name: 'dishwasher',
        displayName: 'Dishwasher',
        included: false
      },
      {
        name: 'towels',
        displayName: 'Towels',
        included: false
      },
      {
        name: 'bicycles',
        displayName: 'Bicycles',
        included: false
      },
      {
        name: 'gym',
        displayName: 'Gym',
        included: false
      },
      {
        name: 'parking',
        displayName: 'Parking',
        included: false
      },
      {
        name: 'fridge',
        displayName: 'Fridge',
        included: false
      }
    ],
    sectionCompleted: true
  },
  listed: true,
  lastUpdatedByAdminUser: null,
  completedAt: Date.now()
})
