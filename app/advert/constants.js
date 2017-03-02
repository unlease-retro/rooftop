import { UI } from '../shared/constants'

export const name = 'advert'

export const route = '/bot/:_id'

export const DEFAULT_SMS = 'Default SMS content here'

export const UNLEASE_MAIL = 'unleasemail.io'

export const LISTING_PREVIEW_URL_PREFIX = `${UI}/preview-listing?listing=`
export const LISTING_URL_PREFIX = `${UI}/room/`

export const MAP_URL_PREFIX = 'https://www.google.co.uk/maps/@'
export const MAP_URL_SUFFIX = ',17z'

export const HOME_TYPE = [
  { value: 'house', label: 'House share' },
  { value: 'flat', label: 'Flat share' },
]

export const COUPLE_TYPE = [
  { value: 'Yes', label: 'Allowed' },
  { value: 'No', label: 'Not allowed' },
]

export const SERVICE_FEE = [
  { value: 0.00, label: '0%' },
  { value: 0.01, label: '1%' },
  { value: 0.02, label: '2%' },
  { value: 0.03, label: '3%' }
]

export const STATUS_TEXT_COLOURS = {
  active: 'secondary',
  declined: 'error',
  pending: 'dark',
}

export const REPLY_DATE_FORMAT = 'HH:mm, DD MMM YYYY'

export const TABS = [
  { label: 'info', icon: '📝' },
  { label: 'messages', icon: '✉️' }
]

export const INITIAL_TAB = 'info'

export const MESSAGE_TYPES = [
  { value: 'custom', label: 'Custom' },
  { value: 'hook', label: 'Hook' },
  { value: 'sell', label: 'Sell' },
  { value: 'follow', label: 'Follow-up' },
  { value: 'email', label: 'Get Email' },
]

export const MESSAGES = {
  custom: '',
  hook: 'Hi {{hostName}}, are you still looking for somebody for your room?',
  sell: 'Great! I am wondering if you would like to feature your place on my website www.unlease.io to get more exposure.? I\'m not an agent, I run a startup marketplace for short term rentals, so potential tenants will contact you directly and it\'s absolutely free to list. We also have a new video chat feature so you can do online viewings. 🙂 Drew',
  follow: 'Hi {{hostName}}, so what do you think? Do you mind if I list your room on my website? Again, it\'s completely free so should give give you a little extra exposure',
  email: 'Perfect, will do. What\'s the best email address to reach you on for when you get booking requests? We\'ll also set that as your username for our site. Thanks!',
}












