import memo from 'memo-is'
import {mockDOMSource} from '@cycle/dom'
import {Observable} from 'rx'
import intent from '../number-input-intent'

describe('NumberInput-Intent', function() {
  let inputEvents = memo().is(function() {
    return Observable.of({target: {value: 0}});
  });

  beforeEach(() => {
    const domSource = mockDOMSource({
      '.number-input': {
        'input': inputEvents()
      }
    });
    this.intentResult = intent(domSource).newValue$;
  });

  context('when input value 0 entered', () => {

    it('emits the same value', (done) => {
      this.intentResult.subscribe((value) => {
        expect(value).to.eql(0);
        done();
      });
    });

  });
});
