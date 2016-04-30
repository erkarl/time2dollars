function intent(DOM) {
  return {
    newValue$: DOM.select('.number-input')
      .events('input')
      .map(ev => ev.target.value)
  }
}

export default intent;
