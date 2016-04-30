import {Observable} from 'rx'
import {h1, div} from '@cycle/DOM'
import NumberInput from '../../components/number-input/number-input'
import convertTimeToDollars from './converter'

function TimeToDollars({DOM}) {
  let DOMupdated$ = DOM.select(':root').observable.take(1);

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

  let hourlyRate = NumberInput({DOM, props$: hourlyRateProps$});
  let hours = NumberInput({DOM, props$: hoursProps$});
  let minutes = NumberInput({DOM, props$: minutesProps$});
  let seconds = NumberInput({DOM, props$: secondsProps$});

  let state$ = Observable.combineLatest(
    hourlyRate.value$,
    hours.value$,
    minutes.value$,
    seconds.value$,
    convertTimeToDollars
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
    MDLDriver: DOMupdated$
  };
}

export default TimeToDollars;
