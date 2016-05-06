import memo from 'memo-is'
import model from '../number-input-model'
import {TestScheduler, ReactiveTest} from 'rx'

describe('NumberInput-Model', function() {
  let onNext = ReactiveTest.onNext;
  let initialValueEvents = memo().is(function() {
    return [onNext(250, {initial: '40'})];
  });

  let newValueEvents = memo().is(function() {
    return [];
  });

  beforeEach(() => {
    let scheduler = new TestScheduler();
    let props$ = scheduler.createHotObservable(initialValueEvents());
    let newValue$ = scheduler.createHotObservable(newValueEvents());
    let actions = {newValue$}

    let model$ = model(props$, actions);
    this.results = scheduler.
      startScheduler(
        function() { return model$; }
      ).messages;
  });

  it('starts with initial value', () => {
    expect(this.results).to.eql([onNext(250, 40)]);
  });

  context('when props include multiple initial values', () => {
    initialValueEvents.is(function() {
      return [
        onNext(250, {initial: '40'}),
        onNext(300, {initial: 20})
      ];
    });

    it('only takes the first initial value', () => {
      expect(this.results).to.eql([onNext(250, 40)]);
    });

    context('when new value entered', () => {
      newValueEvents.is(function() {
        return [onNext(260, '70')];
      });

      it('emits the new value', () => {
        expect(this.results).to.eql([
          onNext(250, 40),
          onNext(260, 70)
        ]);
      });

    });

    context('when new invalid value entered', () => {
      newValueEvents.is(function() {
        return [onNext(260, 'invalid')];
      });

      it('emits an empty string', () => {
        expect(this.results).to.eql([
          onNext(250, 40),
          onNext(260, '')
        ]);
      });

    });

  });
});
