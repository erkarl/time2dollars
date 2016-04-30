import {Observable} from 'rx'
import {h1, div} from '@cycle/DOM'

function view(total$, hourlyRate$, hours$, minutes$, seconds$) {
  return Observable
    .combineLatest(
      total$,
      hourlyRate$,
      hours$,
      minutes$,
      seconds$,
      (totalSum, hourlyRateVTree, hoursVTree, minutesVTree, secondsVTree) =>
        div('.container', [
          hourlyRateVTree,
          hoursVTree,
          minutesVTree,
          secondsVTree,
          h1('Total: ' + totalSum + '$')
        ])
    )
}

export default view;
