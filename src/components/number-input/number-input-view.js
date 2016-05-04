import {Observable} from 'rx'
import {div, input, label} from '@cycle/DOM'

function renderInputField(value) {
  return input('.number-input .mdl-textfield__input',
    {
      type: 'tel',
      attributes: {inputmode: "numeric"},
      value: value,
      pattern: "-?[0-9]*(\.[0-9]+)?"
    }
  )
}

function renderLabel(labelText) {
  return label('.number-input-label .mdl-textfield__label', labelText)
}

function renderNumberInput(props, value) {
  return div('.number-input-container', [
    div('.mdl-textfield .mdl-js-textfield .mdl-textfield--floating-label',
      [renderInputField(value), renderLabel(props.label)]
    )]
  )
}

function view(props$, value$) {
  return Observable.combineLatest(props$, value$, renderNumberInput);
}

export default view;
