import {Observable} from 'rx'
import NumberInput from '../../components/number-input/number-input'
import model from './time-to-dollars-model'
import view from './time-to-dollars-view'
import intent from './time-to-dollars-intent'

function TimeToDollars({DOM}) {
  const actions = intent(DOM);

  const hourlyRateProps$ = Observable.just({
    label: 'Hourly Rate', initial: 50
  });
  const hoursProps$ = Observable.just({
    label: 'Hours', initial: 40
  });
  const minutesProps$ = Observable.just({
    label: 'Minutes', initial: ''
  });
  const secondsProps$ = Observable.just({
    label: 'Seconds', initial: ''
  });

  const hourlyRate = NumberInput({DOM, props$: hourlyRateProps$});
  const hours = NumberInput({DOM, props$: hoursProps$});
  const minutes = NumberInput({DOM, props$: minutesProps$});
  const seconds = NumberInput({DOM, props$: secondsProps$});

  const state$ = model(
    hourlyRate.value$,
    hours.value$,
    minutes.value$,
    seconds.value$
  );

  const vtree$ = view(
    state$,
    hourlyRate.DOM,
    hours.DOM,
    minutes.DOM,
    seconds.DOM
  );

  return {
    DOM: vtree$,
    MDLDriver: actions.DOMupdated$
  };
}

export default TimeToDollars;
