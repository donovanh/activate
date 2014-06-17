# Activate

A lightweight JavaScript plugin that makes it easier to add scroll-based triggers to CSS animations on your web page.

## Overview

Activate consists of a JavaScript script that looks for any elements containing the class `js-activate`. If it finds any, it whether they are visible on the page and if so, adds an `active` class to the element.

If you set up CSS rules to affect the contents of the `active` elements, these rules will then be triggered as the page is scrolled.

Activate is small (less than 5Kb), and does not rely on jQuery.

## Demo

A [live demo on Hop.ie](http://hop.ie/activate) shows how this can look. (Note: the demo page is under development, I'll put together something prettier soon)

## Usage

When installed, Activate will run automatically on each page. It looks for any elements with class `js-activate`. These elements are monitored and if they appear on screen, are given the class `js-active`.

Adding and removing the "js-active" class will work on something like this:

	<section class="js-activate">
	  ...
	</section>

When the script determines that the element is visible, it adds a js-active class:

	<section class="js-activate js-active">
	  ...
	</section>

Then, when the element is scrolled off screen, it updates to js-inactive:

	<section class="js-activate js-inactive">
	  ...
	</section>

You can then attach CSS styles and transitions to these active and inactive states as needed.

## Animating elements

You can attach your own animations and transitions to elements within a "js-active" element if you wish, or else make use of the [built-in CSS](https://github.com/donovanh/activate/blob/gh-pages/stylesheets/animations.css) to easily add pre-defined animations. To use them, add "animated" to any elements you'd like to be animated:

	<section class="js-activate">
	  <div class="animated fadein" data-animation-delay="0.5s" data-animation-timing="0.25s">...</div>
	</section>

In this case I've added "fade-in" as the animation type. At the moment this could be any of the following. Along with these classes, you can define some data attributes to control things like animation delay and timing. Any data-* attributes will be parsed into inline CSS.

* fadein
* slideup
* slidedown
* pop

### CSS Structure

If you want to override any styles, or create your own, you may find the CSS structure useful.

First, attach the needed animation (or transition state) to the `js-active` version of an element:

	.js-active .animated.pop {
  		-webkit-animation: pop 0.5s cubic-bezier(0, 0.965, 0.44, 0.96) forwards;
  		animation: pop 0.5s cubic-bezier(0, 0.965, 0.44, 0.96) forwards; }

Then define the animation itself:

	@-webkit-keyframes pop {
	  0% {
	    opacity: 0;
	    -webkit-transform: translateZ(-60px) scaleY(0.9);
	    transform: translateZ(-60px) scaleY(0.9); }

	  40% {
	    opacity: 1; }

	  30% {
	    opacity: 1;
	    -webkit-transform: translateZ(40px) scaleY(1.05);
	    transform: translateZ(40px) scaleY(1.05); }

	  100% {
	    opacity: 1;
	    -webkit-transform: translateZ(0);
	    transform: translateZ(0); } }

	@keyframes pop {
	
		... etc


## Options

Along with `js-activate`, you can add other classes to define how an area on the page is shown. These are:

* once

The element will be given the `js-active` class once and the class won't be removed. Usage:

	<section class="js-activate once">
	  ...
	</section>

* onload

The element will be given the `js-active` class when the page loads and the class won't be removed. Usage:

	<section class="js-activate onload">
	  ...
	</section>

* staggered

Any elements within this one with the `animated` class will have a animation delay added. By default this begins at 0 and steps 0.25s per item, but you can override this using `data-initial-delay`, like:

	<section class="js-activate staggered" data-initial-delay="0.5">
	  <div class="animated pop">...</div>
	</section>

This would cause the first item to begin it's animation after 0.5 seconds, and the second begin after 0.75 seconds, etc.

## Installing

### Bower

The package, including example CSS animations, is available on Bower:

    bower install activate

### Rails

Activate is available through the [Rails Assets](http://rails-assets.org) service. To install, add the gem to your Gemfile:

    gem "rails-assets-activate"

Run `bundle install` to grab the gem. If necessary, bundler will also grab the `rails-assets-modernizr` gem as a dependency.

Then, add the JavaScript to your application's JS includes:

    //= require activate

Finally, if you want to use the CSS animations, they can be added to your CSS application file:

    @import 'activate/stylesheets/animations';

### Raw JavaScript/CSS

*Note:* This script requires [Modernizr](http://modernizr.com) to run. This is so that it can detect whether the site is on a touch-enabled device.

Download the [Activate JavaScript file](https://github.com/donovanh/activate/blob/gh-pages/javascripts/activate.js) and include it in your page like so:

    <script src="/javascripts/activate.js"></script>

The script will automatically detect any `js-animate` class elements on the page and apply the `js-active` class when they are on-screen.

The animation CSS can be [downloaded here](https://github.com/donovanh/activate/blob/gh-pages/stylesheets/animations.css) and referenced whatever way suits you.

## Mobile (touch-enabled) devices 

As the onScroll event is quite unpredictable on touch devices, the `js-active` class will be applied by default. I'd like to improve this and better support mobile devices soon.

For reference, [the CSS source file is here](https://github.com/donovanh/activate/blob/gh-pages/stylesheets/animations.css).

## Tests

Jasmine tests can be [run online](http://hop.ie/activate/test/).

## Pull requests

Pull requests are most welcome. The `master` branch should be cloned and used as the basis of any work, rather than the `gh-pages` branch which is for the public site only.

## License

MIT