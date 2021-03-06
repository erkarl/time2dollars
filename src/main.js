import './styles/layout.css'

import {run} from '@cycle/core'
import {makeDOMDriver} from '@cycle/dom'
import TimeToDollars from './components/time-to-dollars/time-to-dollars'
import makeMaterialDesignDriver from './drivers/material-design-lite/material-design-lite'

run(TimeToDollars, {
  DOM: makeDOMDriver('#app'),
  MDLDriver: makeMaterialDesignDriver
})
