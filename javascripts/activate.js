/*
 *  Activate.js
 *  Description: A small JS script to apply an "active" class to any elements marked "js-activate"
 *               It will also "stagger" animated elements (using animation-delay) within the activate section if needed.
 *  Author: Donovan Hutchinson, d@hop.ie
 */

(function(activate){

  // Public method to initialise the plugin
  activate.init = function() {
    // Build array of all "js-activate" elements
    elementList = document.getElementsByClassName('js-activate');
    elementArray = [].slice.call(elementList);
    checkArray(elementArray);
    window.onscroll = function (event) {
      checkArray(elementArray);
    }
  }

  // Private methods
  elementList = '';
  var checkArray = function(elementArray) {
    elementArray.forEach(checkIfOnScreen);
  }

  var staggerAnimatedElements = function(parentElement) {
    var childers = parentElement.querySelectorAll('.animated');
    // console.log(childers);
    childersArray = [].slice.call(childers);
    var animationDelay = 0;
    childersArray.forEach(function(childer, index, array) {
      childer.setAttribute('style', 'animation-delay: ' + animationDelay + 's');
      childer.setAttribute('style', '-webkit-animation-delay: ' + animationDelay + 's');
      animationDelay += 0.25;
    });
  }

  var checkIfOnScreen = function(element, index, array) {
    if (hasClass(element, 'staggered')) {
      staggerAnimatedElements(element);
    }
    var midpoint = element.offsetTop + (element.offsetHeight / 2);
    if (midpoint >= window.scrollY && midpoint <= (window.scrollY + window.screen.availHeight)) {
      addClass(elementList[index], 'active');
      removeClass(elementList[index], 'inactive');
    } else {
      addClass(elementList[index], 'inactive');
      removeClass(elementList[index], 'active');
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

}(this.activate = this.activate || {}));

//using the exposed myFunc
//myLib.myFunc();