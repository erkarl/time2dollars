import 'material-design-lite/material.min.css'
import 'material-design-lite/material.min.js'

import Cycle from '@cycle/core'
import isolate from '@cycle/isolate'
import {Observable} from 'rx'
import {label, span, section, h1, div, input, makeDOMDriver} from '@cycle/DOM'
import NumberInput from './components/number-input/number-input'

function main({DOM}) {
  let DOMupdated$ = DOM.select(':root').observable.take(1);

  let HourlyRateInput = isolate(NumberInput);
  let HoursInput = isolate(NumberInput);
  let MinutesInput = isolate(NumberInput);
  let SecondsInput = isolate(NumberInput);

  let hourlyRateProps$ = Observable.just({
    label: 'Hourly Rate', initial: 50
  });
  let hoursProps$ = Observable.just({
    label: 'Hours', initial: 40
  });
  let minutesProps$ = Observable.just({
    label: 'Minutes', initial: ''
  });
  let secondsProps$ = Observable.just({
    label: 'Seconds', initial: ''
  });

  let hourlyRate = HourlyRateInput({DOM, props$: hourlyRateProps$});
  let hours = HoursInput({DOM, props$: hoursProps$});
  let minutes = MinutesInput({DOM, props$: minutesProps$});
  let seconds = SecondsInput({DOM, props$: secondsProps$});

  let state$ = Observable.combineLatest(
    hourlyRate.value$,
    hours.value$,
    minutes.value$,
    seconds.value$,
    (hourlyRate, hoursWorked, minutesWorked, secondsWorked) => {
      let secondsInMinutes = secondsWorked / 60;
      let minutesInHours = (secondsInMinutes + minutesWorked) / 60;
      let convertedHoursWorked = hoursWorked + minutesInHours;
      let totalSum = hourlyRate * convertedHoursWorked;
      let convertedTotalSum = Math.round(totalSum * 100) / 100;

      const zeroToEmpty = (value) => {
        return (value === 0) ? "" : value;
      };

      secondsWorked = zeroToEmpty(secondsWorked);
      return convertedTotalSum;
    }
  );

  return {
    DOM: Observable
      .combineLatest(
        state$,
        hourlyRate.DOM,
        hours.DOM,
        minutes.DOM,
        seconds.DOM,
        (totalSum, hourlyRateVTree, hoursVTree, minutesVTree, secondsVTree) =>
          div('.container', [
            hourlyRateVTree,
            hoursVTree,
            minutesVTree,
            secondsVTree,
            h1('Total: ' + totalSum + '$')
          ])
      ),
    LOG: state$,
    MDLDriver: DOMupdated$
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app'),
  MDLDriver: DOMupdated$ => { DOMupdated$.subscribe(updatedDOM => {
      componentHandler.upgradeDom();
    });
  },
  LOG: msg$ => { msg$.subscribe(msg => {
      console.log(msg);
    });
  }
})
