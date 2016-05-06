import intent from '../time-to-dollars-intent'
import memo from 'memo-is'
import {mockDOMSource} from '@cycle/dom'
import {Observable, TestScheduler, ReactiveTest} from 'rx'

describe('TimeToDollars-Intent', function() {
  let onNext = ReactiveTest.onNext;
  let onCompleted = ReactiveTest.onCompleted;
  let rootLoadedEvents = memo().is(function(){
    return [];
  });

  beforeEach(() => {
    let scheduler = new TestScheduler();

    let rootLoaded$ = scheduler.createHotObservable(rootLoadedEvents());

    const domSource = mockDOMSource({
      ':root': {
        observable: rootLoaded$
      }
    });

    let intentResult = intent(domSource).DOMupdated$;
    this.results = scheduler.
      startScheduler(
        function() { return intentResult; }
      ).messages;
  });

  it('does not complete before DOM loaded', () => {
    expect(this.results).to.eql([]);
  });

  context('when DOM is loaded', () => {
    rootLoadedEvents.is(function(){
      return [onNext(250)];
    });

    it('does emit an event and complete', () => {
      expect(this.results).to.eql([onNext(250), onCompleted(250)]);
    });

  });
});
