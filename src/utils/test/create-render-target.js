function createRenderTarget() {
  let element = document.createElement('div');
  element.className = 'cycle-test';
  document.body.appendChild(element);
  return element;
}

export default createRenderTarget
