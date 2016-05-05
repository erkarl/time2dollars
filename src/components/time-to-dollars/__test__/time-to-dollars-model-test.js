import memo from 'memo-is'
import model from '../time-to-dollars-model'
import {TestScheduler} from 'rx'
import {ReactiveTest} from 'rx'

describe('TimeToDollars-Model', function() {
  let onNext = ReactiveTest.onNext;
  let hourlyRateEvents = memo().is(function(){
    return [];
  });
  let hoursEvents = memo().is(function(){
    return [];
  });
  let minutesEvents = memo().is(function(){
    return [];
  });
  let secondsEvents = memo().is(function(){
    return [];
  });

  beforeEach(() => {
    let scheduler = new TestScheduler();
    let hourlyRate$ = scheduler.createHotObservable(hourlyRateEvents());
    let hours$ = scheduler.createHotObservable(hoursEvents());
    let minutes$ = scheduler.createHotObservable(minutesEvents());
    let seconds$ = scheduler.createHotObservable(secondsEvents());

    let model$ = model(hourlyRate$, hours$, minutes$, seconds$);
    this.results = scheduler.
      startScheduler(
        function() { return model$; }
      ).messages;
  });

  context('when no events emitted', () => {
    it('does not emit value by default', () => {
      expect(this.results).to.eql([]);
    });
  });

  context('when hourly rate emitted', () => {
    hourlyRateEvents.is(function(){
      return [onNext(250)];
    });

    it('does not emit a value', () => {
      expect(this.results).to.eql([]);
    });

  });

  context('when hours emitted', () => {
    hoursEvents.is(function(){
      return [onNext(250)];
    });

    it('does not emit a value', () => {
      expect(this.results).to.eql([]);
    });

  });

  context('when minutes emitted', () => {
    minutesEvents.is(function(){
      return [onNext(250)];
    });

    it('does not emit a value', () => {
      expect(this.results).to.eql([]);
    });

  });

  context('when seconds emitted', () => {
    secondsEvents.is(function(){
      return [onNext(250)];
    });

    it('does not emit a value', () => {
      expect(this.results).to.eql([]);
    });

  });

  context('when all inputs emit a value', () => {
    hourlyRateEvents.is(function(){
      return [onNext(250, 50)];
    });
    hoursEvents.is(function(){
      return [onNext(260, 40)];
    });
    minutesEvents.is(function(){
      return [onNext(270, 60)];
    });
    secondsEvents.is(function(){
      return [onNext(280, 3600)];
    });

    it('does convert time to dollars', () => {
      expect(this.results).to.eql([onNext(280, 2100)]);
    });

  });

  context('when all inputs emit multiple values', () => {
    hourlyRateEvents.is(function(){
      return [onNext(250, 50), onNext(320, 0)];
    });
    hoursEvents.is(function(){
      return [onNext(260, 40), onNext(310, 20)];
    });
    minutesEvents.is(function(){
      return [onNext(270, 60), onNext(300, 0)];
    });
    secondsEvents.is(function(){
      return [onNext(280, 3600), onNext(290, 0)];
    });

    it('does convert time to dollars multiple times', () => {
      expect(this.results).to.eql([
        onNext(280, 2100),
        onNext(290, 2050),
        onNext(300, 2000),
        onNext(310, 1000),
        onNext(320, 0)
      ]);
    });

  });

});
