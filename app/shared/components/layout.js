import styled from 'styled-components'

// import { space } from 'style'

export const View = styled.div`
  width: ${ props => props.width || View.default.width };
  max-width: ${ props => props.maxWidth || View.default.maxWidth };
  margin: 0 auto;
`

// TODO - usage notes
// TODO - full width mobile => `& > * { flex: 0 0 100%; }`
// TODO - variable cell widths => `& > *:nth-child(n) { flex-basis: 10em; }`
// TODO - percentage cell widths => `> *:nth-child(n) { flex-basis: calc(100% - gutter); }` || columns: `calc(100% * 1 / 12)`

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -${ props => props.gutter || Grid.default.gutter };

  & > * {
    flex: ${ props => props.cell ? `1 0 ${props.cell}` : 1 };
    margin: ${ props => props.gutter || Grid.default.gutter };
  }
`

View.default = {
  width: '1280px',
  maxWidth: '100%',
}

Grid.default = {
  gutter: '0.5em',
}

// NOTE: flex: [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
