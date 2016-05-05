import memo from 'memo-is'
import model from '../time-to-dollars-model'

describe('TimeToDollars-Model', function() {
  let hourlyRateEvents = memo().is(function(){
      return [];
    }
  );

  it('works', () => {
    console.log('hourly Rate events', hourlyRateEvents());
    expect(true).to.eql(true)
  });
});
