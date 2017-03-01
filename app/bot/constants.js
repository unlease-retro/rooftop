import { UI } from '../shared/constants'

export const route = '/bot'

export const LISTING_PREVIEW_URL_PREFIX = `${UI}/preview-listing?listing=`

export const FIELDS = [
  {
    key: 'updatedAt',
    label: 'Updated At'
  },
  {
    key: 'title',
    label: 'Title',
  },
  {
    key: 'hostName',
    label: 'Host Name'
  },
  {
    key: 'description',
    label: 'Description'
  },
  {
    key: 'availabilityFrom',
    label: 'Start Date'
  },
  {
    key: 'availabilityTo',
    label: 'End Date'
  },
  {
    key: 'price',
    label: 'Price'
  },
  {
    key: 'city',
    label: 'City'
  },
  {
    key: 'postcode',
    label: 'Postcode'
  },
]

export const FILTERS = {
  status: [
    { value: 'active', label: 'Active' },
    { value: 'declined', label: 'Declined' },
    { value: 'pending', label: 'Pending' },
  ],
  contacted: [
    { value: 'normal', label: 'Normal' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'uncontacted', label: 'Uncontacted' }
  ]
}
