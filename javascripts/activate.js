/*
 *  Activate.js
 *  Description: A small JS script to apply an "active" class to any elements marked "js-activate"
 *  Author: Donovan Hutchinson, d@hop.ie
 */

(function(activate){

  activate.init = function() {
    // Build array of all "js-activate" elements
    elementList = document.getElementsByClassName('js-activate');
    checkArray(elementList);
    if (Modernizr.touch) {
      window.ontouchmove = function (event) {
        checkArray(elementList);
      }
    } else {
      scrollTimer = 0;
      lastScrollFireTime = 0;
      window.onscroll = function (event) {
        throttler(checkArray(elementList), 100);
      }
    }
  }

  // Private methods
  elementList = '';
  var checkArray = function(elementList) {
    elementArray = [].slice.call(elementList);
    elementArray.forEach(function(element, index, array) {
      if (checkIfOnScreen(element)) {
        addClass(elementList[index], 'active');
        removeClass(elementList[index], 'inactive');
        applyDataAttributes(element);
      } else {
        addClass(elementList[index], 'inactive');
        removeClass(elementList[index], 'active');
        clearInlineStyles(element);
      }
    });
  }

  var applyDataAttributes = function(parentElement) {
    var childrenElementSet = parentElement.querySelectorAll('.animated');
    childArray = [].slice.call(childrenElementSet);
    childArray.forEach(function(element, index, array) {
      var elementStyles = '';
      for (var i = 0; i < element.attributes.length; i++) {
        attr = element.attributes[i];
        if (/^data-/.test(attr.nodeName)) {
          elementStyles += attr.nodeName.replace(/^data-/, '') + ': ' + attr.nodeValue + '; ';
          elementStyles += '-webkit-' + attr.nodeName.replace(/^data-/, '') + ': ' + attr.nodeValue + '; ';
        }
      }
      element.setAttribute('style', elementStyles);
    });
  }

  var clearInlineStyles = function(parentElement) {
    var childrenElementSet = parentElement.querySelectorAll('.animated');
    childArray = [].slice.call(childrenElementSet);
    childArray.forEach(function(element, index, array) {
      element.setAttribute('style', '');
    });
  }

  var checkIfOnScreen = function(element) {
    var midpoint = element.offsetTop + (element.offsetHeight / 2);
    if (midpoint >= window.scrollY && midpoint <= (window.scrollY + window.screen.availHeight)) {
      return true;
    } else {
      return false;
    }
  }

  // Helper functions for adding and removing classes, from Openjs.com
  // http://www.openjs.com/scripts/dom/class_manipulation.php
  var hasClass = function(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  }
  var addClass = function(ele,cls) {
    if (!hasClass(ele,cls)) ele.className += " "+cls;
  }
  var removeClass = function(ele,cls) {
    if (hasClass(ele,cls)) {
      var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
      ele.className=ele.className.replace(reg,' ').trim();
    }
  }
  var throttler = function(action, minScrollTime) {
    var now = new Date().getTime();
    if (!scrollTimer) {
      if (now - lastScrollFireTime > (3 * minScrollTime)) {
          action;   // fire immediately on first scroll
          lastScrollFireTime = now;
      }
      scrollTimer = setTimeout(function() {
          scrollTimer = null;
          lastScrollFireTime = new Date().getTime();
          action;
      }, minScrollTime);
    }
  }

  /* test-code */
  activate.test = function() {
    var exports = {};
    exports._hasClass = hasClass;
    exports._addClass = addClass;
    exports._removeClass = removeClass;
    exports._checkIfOnScreen = checkIfOnScreen;
    exports._clearInlineStyles = clearInlineStyles;
    return exports;
  }
  /* end-test-code */

}(this.activate = this.activate || {}));

// Kick it off on load
window.onload = function() { activate.init(); }
