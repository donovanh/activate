// Private tests are exposed via activate.METHODNAME()

describe("Activate", function() {

  beforeEach(function() {
    var containerDiv = document.createElement('div');
    containerDiv.style.height = 800;
    containerDiv.className = 'js-activate top';
    // Add a child element with class "animated"
    var childDiv = document.createElement('div');
    childDiv.className = 'animated';
    childDiv.setAttribute('data-animation-delay','5s');
    childDiv.innerHTML = '<p style="height:200px">foo</p>';
    containerDiv.appendChild(childDiv);
    var paddingDiv = document.createElement('div');
    paddingDiv.className = 'padding';
    paddingDiv.innerHTML = '<p style="height:10000px">bar</p>';
    document.body.appendChild(containerDiv);
    document.body.appendChild(paddingDiv);
    activate.init();
  });

  afterEach(function() {
    var containerDiv = document.querySelector(".js-activate");
    var paddingDiv = document.querySelector(".padding");
    document.body.removeChild(containerDiv);
    document.body.removeChild(paddingDiv);
    window.scrollTo(0,0);
  });

  it("should add a class", function() {
    var containerDiv = document.querySelector(".js-activate");
    activate.addClass(containerDiv, 'foo');
    expect(activate.hasClass(containerDiv, 'foo')).not.toBe(null);
  });

  it("should remove a class", function() {
    var containerDiv = document.querySelector(".js-activate");
    activate.removeClass(containerDiv, 'top');
    expect(activate.hasClass(containerDiv, 'top')).toBe(null);
  });

  it("should identify that a class in place", function() {
    var foo = document.createElement('div');
    foo.className = 'bar';
    expect(activate.hasClass(foo, 'bar')).not.toBe(null);
  });

  it("should identify that a class is not in place", function() {
    var foo = document.createElement('div');
    foo.className = 'bar';
    expect(activate.hasClass(foo, 'boop')).toBe(null);
  });

  it("should test that a div is on-screen", function() {
    var containerDiv = document.querySelector(".js-activate");
    expect(activate.checkIfOnScreen(containerDiv)).toBe(true);
  });

  it("should test that a div is not on-screen", function() {
    var containerDiv = document.querySelector(".js-activate");
    window.scrollTo(0,500);
    expect(activate.checkIfOnScreen(containerDiv)).toBe(false);
  });

  //
  it("should mark a visible div as active", function() {
    var containerDiv = document.querySelector(".js-activate");
    expect(activate.hasClass(containerDiv, 'js-active')).not.toBe(null);
  });

  it("should apply data attributes as inline styles", function() {
    var childDiv = document.querySelector(".animated");
    expect(childDiv.getAttribute('style')).toEqual('animation-delay: 5s; -webkit-animation-delay: 5s; ');
  });

  it("should remove inline styles", function() {
    var containerDiv = document.querySelector(".js-activate");
    activate.clearInlineStyles(containerDiv);
    var childDiv = document.querySelector(".animated");
    expect(childDiv.getAttribute('style')).toEqual('');
  });

});
