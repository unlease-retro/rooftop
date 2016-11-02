export const AREAS = {
  anywhere: { lat: null, lng: null },
  london: { lat: 51.5073509, lng: -0.12775829999998223 },
  oxford: { lat: 51.7520209, lng: -1.2577263000000585 },
}

export const FILTERS = {
  listed: [
    { value: true, label: 'Active' },
    { value: false, label: 'Inactive' },
  ],
  area: [
    ...Object.keys(AREAS).map( a => ({ value: a, label: a }))
  ],
  hostStatus: [
    { value: 'unspecified', label: '' },
    { value: 'nonResponsive', label: 'Disenfranchised' },
    { value: 'leakage', label: 'Disintermediated' },
  ],
}
