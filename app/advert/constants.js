import { UI } from '../shared/constants'

export const name = 'advert'

export const route = '/bot/:_id'

export const DEFAULT_SMS = 'Default SMS content here'

export const LISTING_PREVIEW_URL_PREFIX = `${UI}/preview-listing?listing=`
export const LISTING_URL_PREFIX = `${UI}/room/`

export const MAP_URL_PREFIX = 'https://www.google.co.uk/maps/@'
export const MAP_URL_SUFFIX = ',17z'

export const HOME_TYPES = [
	{ value: 'house', label: 'House share' },
	{ value: 'flat', label: 'Flat share' },
]

export const STATUS_TEXT_COLOURS = {
  active: 'secondary',
  declined: 'error',
  pending: 'dark',
}

export const REPLY_DATE_FORMAT = 'HH:mm, DD MMM YYYY'