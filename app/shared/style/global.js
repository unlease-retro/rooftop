import { injectGlobal } from 'styled-components'

import { colours, scale, typography } from '../style'

injectGlobal`
  html, body, #Root, #App {
    height: 100%;
    min-height: 100%;
  }

  body {
    ${ typography.ff() }
    font-size: ${ scale.getScaledValue(4) };
    line-height: 1.625;
    color: ${ colours.dark };
    -webkit-font-smoothing: antialiased;
  }

  #App {
    display: flex;
    flex-direction: column;
  }

  ::-moz-selection {
    color: ${ colours.light };
    background: ${ colours.dark };
  }
  ::selection {
    color: ${ colours.light };
    background: ${ colours.dark };
  }
`
