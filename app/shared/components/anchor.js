import React from 'react'
import styled from 'styled-components'
import Atomic from 'style/atomic'
import { Link } from 'react-router'

import { colours } from 'style'

/* eslint-disable no-unused-vars */
export const Anchor = styled(({ atomic, ...rest }) => <Link {...rest} />)`
  color: ${ colours.dark };
  text-decoration: underline;
  cursor: pointer;
  transition: 0.2s;

  ${ ({ atomic }) => Atomic(atomic) }

  &:hover {
    color: ${ colours.accent };
  }
`
/* eslint-enable no-unused-vars */
