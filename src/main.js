import Cycle from '@cycle/core'
import {Observable} from 'rx'
import {label, span, section, h1, div, input, makeDOMDriver} from '@cycle/DOM'
import 'material-design-lite/material.min.css'
import 'material-design-lite/material.min.js'
import numberInput from './components/number-input/number-input.js'

function main({DOM}) {
  let DOMupdated$ = DOM.select(':root').observable.take(1);
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

      const zeroToEmpty = (value) => {
        return (value === 0) ? "" : value;
      };

      secondsWorked = zeroToEmpty(secondsWorked);
      return {hourlyRate, hoursWorked, minutesWorked, secondsWorked, totalSum: convertedTotalSum};
    }
  );
  return {
    DOM: state$
      .map(({hourlyRate, hoursWorked, minutesWorked, secondsWorked, totalSum}) =>
        div('.container', [
          section([
            div('.mdl-textfield .mdl-js-textfield .mdl-textfield--floating-label', [
              label('.hourly-rate-label', 'Hourly Rate'),
              input('.hourly-rate', {type: 'text', value: hourlyRate})
            ])
          ]),
          section([
            div('.mdl-textfield .mdl-js-textfield .mdl-textfield--floating-label', [
              label('.hours-worked-label', 'Hours'),
              input('.hours-worked', {type: 'text', value: hoursWorked})
            ])
          ]),
          section([
            div('.mdl-textfield .mdl-js-textfield .mdl-textfield--floating-label', [
              label('.minutes-worked-label', 'Minutes'),
              input('.minutes-worked', {type: 'text', value: minutesWorked})
            ])
          ]),
          div('.mdl-textfield .mdl-js-textfield .mdl-textfield--floating-label', [
            input('.seconds-worked .mdl-textfield__input #test', {type: 'text', value: secondsWorked, pattern: "-?[0-9]*(\.[0-9]+)?"}),
            label('.seconds-worked-label .mdl-textfield__label', { attributes: { for: 'test' } }, 'Seconds'),
          ]),
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
      numberInput();
    });
  }
})
