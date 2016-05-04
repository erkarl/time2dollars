import {assert} from 'chai'
import {run} from '@cycle/core'
import {div, h1, makeDOMDriver} from '@cycle/DOM'
import {Observable} from 'Rx'
import createRenderTarget from '../../../utils/test/create-render-target'
import TimeToDollars from '../time-to-dollars'

describe('TimeToDollars', function() {

  it('displays correct result with default props', function () {

    let {sinks, sources} = run(TimeToDollars, {
      DOM: makeDOMDriver(createRenderTarget())
    });

    sources.DOM.select('h1').observable
      .skip(1)
      .take(1)
      .map(element => element[0].textContent)
      .subscribe(total => {
        assert.equal(total, "Total: $2000");
      });
  });
});
