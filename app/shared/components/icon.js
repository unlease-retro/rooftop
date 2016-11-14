import React from 'react'
import styled from 'styled-components'
import Atomic from 'style/atomic'

import { colours } from 'style'

const MaterialIcon = ({ children, className, ...props }) => <i className={`material-icons ${className}`} { ...props }>{ children }</i>

export const Icon = styled(MaterialIcon)`
  color: ${ props => props.color && colours[props.color] || Icon.default.color };

  ${ ({ atomic }) => Atomic({ ...Icon.default.atomic, ...atomic }) }
`

Icon.default = {
  color: colours.dark,
  atomic: {
    va: 'm',
  },
}
