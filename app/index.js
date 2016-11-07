import React from 'react'
import { render } from 'react-dom'

import 'style/global'

import Root from './shared/containers/Root'

const rootEl = document.getElementById('Root')

render(<Root />, rootEl)
