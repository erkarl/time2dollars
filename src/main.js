import 'material-design-lite/material.min.css'
import 'material-design-lite/material.min.js'
import './styles/layout.css'
import Cycle from '@cycle/core'
import {makeDOMDriver} from '@cycle/DOM'
import TimeToDollars from './components/time-to-dollars/time-to-dollars'

const main = TimeToDollars;

Cycle.run(main, {
  DOM: makeDOMDriver('#app'),
  MDLDriver: DOMupdated$ => { DOMupdated$.subscribe(updatedDOM => {
      componentHandler.upgradeDom();
    });
  }
})
