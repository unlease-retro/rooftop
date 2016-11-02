export const FILTERS = {
  listed: [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' },
  ],
  area: [
    { value: 'anywhere', label: 'Anywhere' },
    { value: 'london', label: 'London' },
    { value: 'oxford', label: 'Oxford' },
  ],
  hostStatus: [
    { value: 'unspecified', label: '' },
    { value: 'disenfranchised', label: 'Disenfranchised' },
    { value: 'disintermediated', label: 'Disintermediated' },
  ],
}

// TODO - generate FILTERS.area from AREAS Object.keys(AREAS).map( a => ({ value: a, label: capitalise(a) }))

export const AREAS = {
  anywhere: { lat: null, lng: null },
  london: { lat: 51.5073509, lng: -0.12775829999998223 },
  oxford: { lat: 51.7520209, lng: -1.2577263000000585 },
}

// export const HOST_STATUS = {
//   unspecified: { disenfranchised: false, disintermediated: false },
//   disenfranchised: { disenfranchised: true, disintermediated: false },
//   disintermediated: { disintermediated: true, disenfranchised: false },
// }
