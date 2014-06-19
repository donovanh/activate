/*
 *  Activate.js
 *  Description: A small JS script to apply an "js-active" class to any elements marked "js-activate"
 *  Author: Donovan Hutchinson, d@hop.ie
 */

var activate = new function() {
  "use strict";
  var a = this;
  a.elementList = '';
  a.elementArray = [];
  a.scrollTimer = null, a.lastScrollFireTime = 0;

  a.init = function() {
    // Build array of all "js-activate" elements
    a.elementList = document.getElementsByClassName('js-activate');
    a.elementArray = [].slice.call(a.elementList);
    if (a.elementArray.length > 0) {
      a.check();
      if (Modernizr.touch) {
        setInterval(function() {
          a.check();
        }, 100);
      } else {
        window.onscroll = function () {
          a.throttler(a.check, 100);
        }
      }
    }
  }
  
  a.check = function() {
    a.elementArray.forEach(function(element, index, array) {
      if (a.hasClass(element, 'staggered')) {
        a.staggerAnimatedElements(element);
      }
      if (a.checkIfOnScreen(element)) {
        a.addClass(a.elementList[index], 'js-active');
        a.removeClass(a.elementList[index], 'js-inactive');
        a.applyDataAttributes(element);
      } else if (!a.hasClass(element, 'once')) {
        a.addClass(a.elementList[index], 'js-inactive');
        a.removeClass(a.elementList[index], 'js-active');
        a.clearInlineStyles(element);
      }
    });
  }

  a.staggerAnimatedElements = function(parentElement) {
    var initialDelay = parentElement.getAttribute('data-initial-delay');
    if (initialDelay !== null && initialDelay.length > 0) {
      var animationDelay = parseFloat(parentElement.getAttribute('data-initial-delay'));
    } else {
      var animationDelay = 0;
    }
    var childers = parentElement.querySelectorAll('.animated');
    var childersArray = [].slice.call(childers);
    childersArray.forEach(function(childer, index, array) {
      var elementStyles = '';
      elementStyles += 'animation-delay: ' + animationDelay + 's; ';
      elementStyles += '-webkit-animation-delay: ' + animationDelay + 's; ';
      childer.setAttribute('style', elementStyles);
      animationDelay += 0.15;
    });
  }

  a.applyDataAttributes = function(parentElement) {
    var childrenElementSet = parentElement.querySelectorAll('.animated');
    var childArray = [].slice.call(childrenElementSet);
    childArray.forEach(function(element, index, array) {
      var elementStyles = '';
      for (var i = 0; i < element.attributes.length; i++) {
        var attr = element.attributes[i];
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

  a.clearInlineStyles = function(parentElement) {
    var childrenElementSet = parentElement.querySelectorAll('.animated');
    var childArray = [].slice.call(childrenElementSet);
    childArray.forEach(function(element, index, array) {
      element.setAttribute('style', '');
    });
  }

  a.checkIfOnScreen = function(element) {
    if (a.hasClass(element, 'onload')) {
      return true;
    }
    var overlap = 100;
    var topTrigger = window.scrollY + overlap;
    var bottomTrigger = window.scrollY + window.innerHeight - overlap;
    var elementTop = element.offsetTop;
    var elementBottom = element.offsetTop + element.offsetHeight;
    if ((elementBottom < topTrigger) || (elementTop > bottomTrigger)) {
      return false;
    } else {
      return true;
    }
  }

  // Helpful functions for adding and removing classes, from Openjs.com
  // http://www.openjs.com/scripts/dom/class_manipulation.php
  a.hasClass = function(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
  }
  a.addClass = function(ele,cls) {
    if (!activate.hasClass(ele,cls)) ele.className += " "+cls;
  }
  a.removeClass = function(ele,cls) {
    if (activate.hasClass(ele,cls)) {
      var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
      ele.className=ele.className.replace(reg,' ').trim();
    }
  }
  a.throttler = function(action, minScrollTime) {
    var now = new Date().getTime();
    if (!a.scrollTimer) {
      if (now - a.lastScrollFireTime > (minScrollTime)) {
        action();
        a.lastScrollFireTime = now;
        
        a.scrollTimer = setTimeout(function() {
          a.scrollTimer = null;
          action();
          a.lastScrollFireTime = new Date().getTime();
        }, minScrollTime);
      }
    }
  }

};

// Set the "animated" elements to hidden
document.write("<style>.cssanimations .animated { opacity: 0;}</style>");

// Kick it off on load
document.addEventListener("DOMContentLoaded", function(event) {
  activate.init();
});

