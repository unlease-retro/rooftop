import React from 'react'
import styled from 'styled-components'

const MaterialIcon = ({ children, className, ...props }) => <i className={`material-icons ${className}`} { ...props }>{ children }</i>

export const Icon = styled(MaterialIcon)`
  color: black;
  vertical-align: middle;
`
