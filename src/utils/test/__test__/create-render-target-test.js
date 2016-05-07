import createRenderTarget from '../create-render-target'

describe('TestUtils-createRenderTarget', function() {
  before(() => {
    this.element = createRenderTarget();
  });

  it('inserts element into DOM', () => {
    expect(document.querySelector('.cycle-test')).to.exist
  });

  it('returns a DIV element', () => {
    expect(this.element.tagName).to.eql('DIV')
  });

  it('returns an element with cycle-test class', () => {
    expect(this.element.className).to.eql('cycle-test')
  });

});
