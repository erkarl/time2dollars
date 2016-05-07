import 'material-design-lite/material.min.css'
import 'material-design-lite/material.min.js'

function makeMaterialDesignDriver(DOMLoaded$) {
  DOMLoaded$.subscribe(() => {
    componentHandler.upgradeDom();
  });
}

export default makeMaterialDesignDriver;
