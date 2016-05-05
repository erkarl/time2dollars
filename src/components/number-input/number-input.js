import {Observable} from 'rx'
import {div, input, label} from '@cycle/dom'
import isolate from '@cycle/isolate'
import model from './number-input-model'
import view from './number-input-view'
import intent from './number-input-intent'

function NumberInput({DOM, props$}) {
  const actions = intent(DOM);
  const value$ = model(props$, actions);
  const vtree$ = view(props$, value$);

  return {
    DOM: vtree$,
    value$
  };
};

function IsolatedNumberInput(sources) {
  return isolate(NumberInput)(sources)
}

export default IsolatedNumberInput;
