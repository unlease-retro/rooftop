import { UI } from '../shared/constants'

export const name = 'advert'

export const route = '/bot/:_id'

export const LISTING_PREVIEW_URL_PREFIX = `${UI}/preview-listing?listing=`
export const LISTING_URL_PREFIX = `${UI}/room/`

export const DEFAULT_SMS = 'Default SMS content here'

export const HOME_TYPES = [
	{ value: 'House share', label: 'House share' },
	{ value: 'Flat share', label: 'Flat share' },
	{ value: 'Shared property', label: 'Shared property' },
]

export const STATUS_TEXT_COLOURS = {
  active: 'secondary',
  declined: 'error',
  pending: 'dark',
}
