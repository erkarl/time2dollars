import makeMaterialDesignDriver from '../material-design-lite'
import {Observable} from 'rx'

describe('MaterialDesignLite-Driver', function() {

  context('when DOM loaded', () => {

    beforeEach(() => {
      let DOMLoaded$ = Observable.just();
      sinon.spy(componentHandler, 'upgradeDom');
      makeMaterialDesignDriver(DOMLoaded$);
    });

    it('calls componentHandler.upgradeDom', () => {
      expect(componentHandler.upgradeDom.calledOnce)
        .to.eql(true)
    });

  });

});
