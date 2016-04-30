import 'material-design-lite/material.min.css'
import 'material-design-lite/material.min.js'
import './styles/layout.css'
import Cycle from '@cycle/core'
import {makeDOMDriver} from '@cycle/DOM'
import TimeToDollars from './components/time-to-dollars/time-to-dollars'
import makeMaterialDesignDriver from './drivers/material-design-lite/material-design-lite'

const main = TimeToDollars;

Cycle.run(main, {
  DOM: makeDOMDriver('#app'),
  MDLDriver: makeMaterialDesignDriver
})
