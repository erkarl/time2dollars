import {run} from '@cycle/core'
import {makeDOMDriver} from '@cycle/dom'
import {Observable} from 'rx'
import NumberInput from '../number-input'
import createRenderTarget from '../../../utils/test/create-render-target'

describe('NumberInput-View', function() {

  it('displays input field with value and label', (done) => {
    let props = () => {
      return Observable.just({
        label: 'Seconds', initial: '60'
      });
    };

    let {sinks, sources} = run(NumberInput, {
      DOM: makeDOMDriver(createRenderTarget()),
      props$: props
    });

    sources.DOM.select(':root').observable
      .skip(1)
      .take(1)
      .subscribe(container => {
        expect(container.querySelector('input').value)
          .to.eql('60');
        expect(container
          .querySelector('label').textContent)
          .to.eql('Seconds')
        done();
      });
  });
});
