import Cycle from '@cycle/core'
import {Observable} from 'rx'
import {label, section, h1, div, input, makeDOMDriver} from '@cycle/DOM'
import 'materialize-css/bin/materialize.css'
import 'materialize-css/bin/materialize.js'


function main({DOM}) {
  let changeHourlyRate$ = DOM.select('.hourly-rate')
    .events('input')
    .map(ev => {
      let value = parseFloat(ev.target.value);
      if(isNaN(value)){
        return 0;
      } else {
        return value;
      }
    });
  let changeHoursWorked$ = DOM.select('.hours-worked')
    .events('input')
    .map(ev => {
      let value = parseFloat(ev.target.value);
      if(isNaN(value)){
        return 0;
      } else {
        return value;
      }
    });
  let minutesWorked$ = DOM.select('.minutes-worked')
    .events('input')
    .map(ev => {
      let value = parseFloat(ev.target.value);
      if(isNaN(value)){
        return 0;
      } else {
        return value;
      }
    });
  let secondsWorked$ = DOM.select('.seconds-worked')
    .events('input')
    .map(ev => {
      let value = parseFloat(ev.target.value);
      if(isNaN(value)){
        return 0;
      } else {
        return value;
      }
    });
  let state$ = Observable.combineLatest(
    changeHourlyRate$.startWith(50),
    changeHoursWorked$.startWith(40),
    minutesWorked$.startWith(0),
    secondsWorked$.startWith(0),
    (hourlyRate, hoursWorked, minutesWorked, secondsWorked) => {
      let secondsInMinutes = secondsWorked / 60;
      let minutesInHours = (secondsInMinutes + minutesWorked) / 60;
      let convertedHoursWorked = hoursWorked + minutesInHours;
      let totalSum = hourlyRate * convertedHoursWorked;
      let convertedTotalSum = Math.round(totalSum * 100) / 100;
      return {hourlyRate, hoursWorked, minutesWorked, secondsWorked, totalSum: convertedTotalSum};
    }
  );
  return {
    DOM: state$
      .map(({hourlyRate, hoursWorked, minutesWorked, secondsWorked, totalSum}) =>
        div('.container', [
          section([
            label('.hourly-rate-label', 'Hourly Rate'),
            input('.hourly-rate', {type: 'number', value: hourlyRate, min: 1, max: 10000})
          ]),
          section([
            label('.hours-worked-label', 'Hours'),
            input('.hours-worked', {type: 'number', value: hoursWorked, min: 0, max: 10000})
          ]),
          section([
            label('.minutes-worked-label', 'Minutes'),
            input('.minutes-worked', {type: 'number', value: minutesWorked, min: 0, max: 60})
          ]),
          section([
            label('.seconds-worked-label', 'Seconds'),
            input('.seconds-worked', {type: 'number', value: secondsWorked, min: 0, max: 60})
          ]),
          h1('Total: ' + totalSum + '$')
      ])
    ),
  LOG: state$
  };
}

Cycle.run(main, {
  DOM: makeDOMDriver('#app'),
  LOG: msg$ => { msg$.subscribe(msg => console.log(msg)) }
})
