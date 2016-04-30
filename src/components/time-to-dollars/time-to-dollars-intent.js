function intent(DOM) {
  return {
    DOMupdated$: DOM.select(':root').observable.take(1)
  }
}

export default intent;
