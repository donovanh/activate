// Private tests are exposed via activate.test()._METHODNAME()

describe("Activate", function() {

  beforeEach(function() {
    var containerDiv = document.createElement('div');
    containerDiv.className = 'js-activate top';
    // Add a child element with class "animated"
    var childDiv = document.createElement('div');
    childDiv.className = 'animated';
    childDiv.setAttribute('data-animation-delay','5s');
    containerDiv.appendChild(childDiv);
    document.body.appendChild(containerDiv);
    activate.init();
  });

  afterEach(function() {
    var containerDiv = document.querySelector(".js-activate");
    document.body.removeChild(containerDiv);
  });

  it("should add a class", function() {
    var containerDiv = document.querySelector(".js-activate");
    activate.test()._addClass(containerDiv, 'foo');
    expect(activate.test()._hasClass(containerDiv, 'foo')).not.toBe(null);
  });

  it("should remove a class", function() {
    var containerDiv = document.querySelector(".js-activate");
    activate.test()._removeClass(containerDiv, 'top');
    expect(activate.test()._hasClass(containerDiv, 'top')).toBe(null);
  });

  it("should identify that a class in place", function() {
    var foo = document.createElement('div');
    foo.className = 'bar';
    expect(activate.test()._hasClass(foo, 'bar')).not.toBe(null);
  });

  it("should identify that a class is not in place", function() {
    var foo = document.createElement('div');
    foo.className = 'bar';
    expect(activate.test()._hasClass(foo, 'boop')).toBe(null);
  });

  it("should test that a div is on-screen", function() {
    var containerDiv = document.querySelector(".js-activate");
    expect(activate.test()._checkIfOnScreen(containerDiv)).toBe(true);
  });

  it("should mark a visible div as active", function() {
    var containerDiv = document.querySelector(".js-activate");
    expect(activate.test()._hasClass(containerDiv, 'active')).not.toBe(null);
  });

  it("should mark a visible div as active", function() {
    var containerDiv = document.querySelector(".js-activate");
    expect(activate.test()._hasClass(containerDiv, 'active')).not.toBe(null);
  });

  it("should apply data attributes as inline styles", function() {
    var childDiv = document.querySelector(".animated");
    expect(childDiv.getAttribute('style')).toEqual('animation-delay: 5s; -webkit-animation-delay: 5s; ');
  });

  it("should remove inline styles", function() {
    var containerDiv = document.querySelector(".js-activate");
    activate.test()._clearInlineStyles(containerDiv);
    var childDiv = document.querySelector(".animated");
    expect(childDiv.getAttribute('style')).toEqual('');
  });

});
