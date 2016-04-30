import {Observable} from 'rx'
import {div, input, label} from '@cycle/DOM'
import isolate from '@cycle/isolate'
import view from './number-input-view'

function NumberInput({DOM, props$}) {
  let initialValue$ = props$.map(props => props.initial).first();

  let newValue$ = DOM.select('.number-input')
    .events('input')
    .map(ev => {
      let value = parseFloat(ev.target.value);
      if(isNaN(value)){
        return "";
      } else {
        return value;
      }
    });

  let value$ = initialValue$.concat(newValue$);

  return {
    DOM: view(props$, value$),
    value$
  };
};

function IsolatedNumberInput(sources) {
  return isolate(NumberInput)(sources)
}

export default IsolatedNumberInput;
