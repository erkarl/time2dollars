import memo from 'memo-is'
import convertTimeToDollars from '../converter'

describe('TimeToDollars-Converter', function() {
  let hourlyRate = memo().is(function(){
    return "";
  });
  let hours = memo().is(function(){
    return "";
  });
  let minutes = memo().is(function(){
    return "";
  });
  let seconds = memo().is(function(){
    return "";
  });

  beforeEach(() => {
    this.total = convertTimeToDollars(
      hourlyRate(),
      hours(),
      minutes(),
      seconds()
    );
  });

  it('returns 0 when inputs are empty', () => {
    expect(this.total).to.eql(0);
  });

  context('when hourly rate 100', () => {
    hourlyRate.is(function() {
      return 100;
    });

    it('returns 0', () => {
      expect(this.total).to.eql(0);
    });

    context('when 10 hours worked', () => {
      hours.is(function() {
        return 10;
      });

      it('returns 1000', () => {
        expect(this.total).to.eql(1000);
      });

    });

    context('when 600 minutes worked', () => {
      minutes.is(function() {
        return 600;
      });

      it('returns 1000', () => {
        expect(this.total).to.eql(1000);
      });

    });

    context('when 36000 seconds worked', () => {
      seconds.is(function() {
        return 36000;
      });

      it('returns 1000', () => {
        expect(this.total).to.eql(1000);
      });

    });

    context('when 10 hours, 600 minutes and 36000 seconds worked', () => {
      hours.is(function() {
        return 10;
      });
      minutes.is(function() {
        return 600;
      });
      seconds.is(function() {
        return 36000;
      });

      it('returns 3000', () => {
        expect(this.total).to.eql(3000);
      });

    });

    context('when 5 hours, 5 minutes and 5 seconds worked', () => {
      hours.is(function() {
        return 5;
      });
      minutes.is(function() {
        return 5;
      });
      seconds.is(function() {
        return 5;
      });

      it('returns 508.47', () => {
        expect(this.total).to.eql(508.47);
      });

    });

  });
});
