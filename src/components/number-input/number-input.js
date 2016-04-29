import {Observable} from 'rx'
import {label, span, section, h1, div, input, makeDOMDriver} from '@cycle/DOM'

function NumberInput({DOM, props$}) {
  let initialValue$ = props$.map(props => props.initial).first();

  let newValue$ = DOM.select('.number-input')
    .events('input')
    .map(ev => {
      let value = parseFloat(ev.target.value);
      if(isNaN(value)){
        return 0;
      } else {
        return value;
      }
    });

  let value$ = initialValue$.concat(newValue$);

  let vtree$ = Observable.combineLatest(props$, value$, (props, value) =>
    div('.number-input-container', [
      div('.mdl-textfield .mdl-js-textfield .mdl-textfield--floating-label', [
        input(
          '.number-input .mdl-textfield__input',
          {type: 'text', value: value, pattern: "-?[0-9]*(\.[0-9]+)?"}
        ),
        label('.number-input-label .mdl-textfield__label', props.label),
      ])
    ])
  );

  return {
    DOM: vtree$,
    value$
  };
};

export default NumberInput;