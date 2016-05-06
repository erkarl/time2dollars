import {Observable} from 'rx'
import convertTimeToDollars from './time-to-dollars-converter'

function model(hourlyRate$, hours$, minutes$, seconds$) {
  return Observable.combineLatest(
    hourlyRate$,
    hours$,
    minutes$,
    seconds$,
    convertTimeToDollars
  );
}

export default model;
