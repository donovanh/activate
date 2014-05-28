/*
 *  Activate.js
 *  Description: A small JS script to apply an "active" class to any elements marked "js-activate"
 *  Author: Donovan Hutchinson, d@hop.ie
 */

(function(activate){

  activate.init = function() {
    // Build array of all "js-activate" elements
    elementList = document.getElementsByClassName('js-activate');
    elementArray = [].slice.call(elementList);
    if (elementArray.length > 0) {
      checkArray(elementArray);
      if (Modernizr.touch) {
        setInterval(function() {
          checkArray(elementArray);
        });
      } else {
        scrollTimer = 0;
        lastScrollFireTime = 0;
        window.onscroll = function () {
          throttler(checkArray(elementArray), 100);
        }
      }
    }
  }

  // Private methods
  elementList = '';
  var checkArray = function(elementArray) {
    elementArray.forEach(function(element, index, array) {
      if (hasClass(element, 'staggered')) {
        staggerAnimatedElements(element);
      }
      if (checkIfOnScreen(element)) {
        addClass(elementList[index], 'active');
        removeClass(elementList[index], 'inactive');
        applyDataAttributes(element);
      } else if (!hasClass(element, 'once')) {
        addClass(elementList[index], 'inactive');
        removeClass(elementList[index], 'active');
        clearInlineStyles(element);
      }
    });
  }

  var staggerAnimatedElements = function(parentElement) {
    if (parentElement.getAttribute('data-initial-delay').length > 0) {
      var animationDelay = parseFloat(parentElement.getAttribute('data-initial-delay'));
    } else {
      var animationDelay = 0;
    }
    var childers = parentElement.querySelectorAll('.animated');
    childersArray = [].slice.call(childers);
    childersArray.forEach(function(childer, index, array) {
      var elementStyles = '';
      elementStyles += 'animation-delay: ' + animationDelay + 's; ';
      elementStyles += '-webkit-animation-delay: ' + animationDelay + 's; ';
      childer.setAttribute('style', elementStyles);
      animationDelay += 0.15;
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
      if (elementStyles.length > 0) {
        element.setAttribute('style', elementStyles);
      }
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
    if (hasClass(element, 'onload')) {
      return true;
    }
    var overlap = element.offsetHeight * 0.2;
    var topTrigger = window.scrollY + overlap;
    var bottomTrigger = topTrigger + window.screen.availHeight - overlap;
    var elementTop = element.offsetTop;
    var elementBottom = element.offsetTop + element.offsetHeight;
    if (
      (elementTop < topTrigger) && (elementBottom < topTrigger)
        ||
      (elementTop > bottomTrigger) && (elementBottom > bottomTrigger)
      ) {
      return false;
    } else {
      return true;
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