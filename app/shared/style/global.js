import { injectGlobal } from 'styled-components'

import { colours, scale, typography } from 'style'

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

  ${''/*
    TRANSITIONS - move these one day
  */}

  .slide-right-enter, .slide-right-appear {
    transform: translateX(-100%);
    opacity: 0;
  }
  .slide-right-enter.slide-right-enter-active, .slide-right-appear.slide-right-appear-active {
    transform: translateX(0);
    opacity: 1;
    transition: transform 500ms cubic-bezier(1,0,.31,1), opacity 300ms ease-in;
  }
  .slide-right-leave {
    transform: translateX(0);
    opacity: 1;
  }
  .slide-right-leave.slide-right-leave-active {
    transform: translateX(-100%);
    opacity: 0;
    transition: all 300ms cubic-bezier(1,0,.31,1);
  }
`
