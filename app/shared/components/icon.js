import React from 'react'
import styled from 'styled-components'

const MaterialIcon = ({ children }) => <i className='material-icons'>{ children }</i>

export const Icon = styled(MaterialIcon)`
  color: black;
`
