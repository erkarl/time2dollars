function makeMaterialDesignDriver(DOMupdated$) {
  DOMupdated$.subscribe(updatedDOM => {
    componentHandler.upgradeDom();
  });
}

export default makeMaterialDesignDriver;
