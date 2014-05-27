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

// Modernizr - included to detect "touch-events" support
/* Modernizr 2.8.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-touch-teststyles-prefixes
 */
;window.Modernizr=function(a,b,c){function v(a){i.cssText=a}function w(a,b){return v(l.join(a+";")+(b||""))}function x(a,b){return typeof a===b}function y(a,b){return!!~(""+a).indexOf(b)}function z(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:x(f,"function")?f.bind(d||b):f}return!1}var d="2.8.1",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j,k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m={},n={},o={},p=[],q=p.slice,r,s=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},t={}.hasOwnProperty,u;!x(t,"undefined")&&!x(t.call,"undefined")?u=function(a,b){return t.call(a,b)}:u=function(a,b){return b in a&&x(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=q.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(q.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(q.call(arguments)))};return e}),m.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:s(["@media (",l.join("touch-enabled),("),g,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c};for(var A in m)u(m,A)&&(r=A.toLowerCase(),e[r]=m[A](),p.push((e[r]?"":"no-")+r));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)u(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},v(""),h=j=null,e._version=d,e._prefixes=l,e.testStyles=s,e}(this,this.document);



