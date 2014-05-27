/*
 *  Activate.js
 *  Description: A small JS script to apply an "active" class to any elements marked "js-activate"
 *               It will also "stagger" animated elements (using animation-delay) within the activate section if needed.
 *  Author: Donovan Hutchinson, d@hop.ie
 */

(function(activate){

  activate.init = function() {
    console.log('Activated');
    // Build array of all "js-activate" elements
    elementList = document.getElementsByClassName('js-activate');
    elementArray = [].slice.call(elementList);
    checkArray(elementArray);
    if (Modernizr.touch) {
      window.ontouchmove = function (event) {
        checkArray(elementArray);
      }
    } else {
      scrollTimer = 0;
      lastScrollFireTime = 0;
      window.onscroll = function (event) {
        throttler(checkArray(elementArray), 100);
      }
    }
  }

  // Private methods
  elementList = '';
  var checkArray = function(elementArray) {
    elementArray.forEach(checkIfOnScreen);
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

  var checkIfOnScreen = function(element, index, array) {
    var midpoint = element.offsetTop + (element.offsetHeight / 2);
    if (midpoint >= window.scrollY && midpoint <= (window.scrollY + window.screen.availHeight)) {
      addClass(elementList[index], 'active');
      removeClass(elementList[index], 'inactive');
      applyDataAttributes(element);
    } else {
      addClass(elementList[index], 'inactive');
      removeClass(elementList[index], 'active');
      clearInlineStyles(element);
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

}(this.activate = this.activate || {}));

// Kick it off on load
window.onload = function() { activate.init(); }
