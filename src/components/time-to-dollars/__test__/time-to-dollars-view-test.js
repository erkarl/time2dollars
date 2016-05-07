import {run} from '@cycle/core'
import {div, h1, makeDOMDriver} from '@cycle/dom'
import {Observable} from 'rx'
import createRenderTarget from '../../../utils/test/create-render-target'
import TimeToDollars from '../time-to-dollars'

describe('TimeToDollars-View', function() {

  it('displays correct result with default props', function (done) {

    let {sinks, sources} = run(TimeToDollars, {
      DOM: makeDOMDriver(createRenderTarget())
    });

    sources.DOM.select('h1').observable
      .skip(1)
      .take(1)
      .map(element => element[0].textContent)
      .subscribe(total => {
        expect(total).to.eql("Total: $2000");
        done();
      });
  });
});
