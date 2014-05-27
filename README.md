# Activate

A lightweight JavaScript plugin that makes it easier to add scroll-based triggers to CSS animations on your web page.

## Overview

Activate consists of a JavaScript script that looks for any elements containing the class `js-activate`. If it finds any, it whether they are visible on the page and if so, adds an `active` class to the element.

If you set up CSS rules to affect the contents of the `active` elements, these rules will then be triggered as the page is scrolled.

Activate is small (less than 400 bytes), and does not rely on jQuery.

## Demo

A [live demo on Hop.ie](http://hop.ie/activate) shows how this can look.

## Installing

When installed, Activate will run automatically on each page.

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

### Raw JavaScript

*Note:* This script requires [Modernizr](http://modernizr.com) to run. This is so that it can detect whether the site is on a touch-enabled device.

Download the [Activate JavaScript file](https://github.com/donovanh/activate/blob/gh-pages/javascripts/activate.js) and include it in your page like so:

    <script src="/javascripts/activate.js"></script>

The script will automatically detect any `js-animate` class elements on the page and apply the `active` class when they are on-screen.

## Mobile (touch-enabled) devices 

As the onScroll event is quite unpredictable on touch devices, the `active` class will be applied by default. I'd like to improve this and better support mobile devices soon.

For reference, [the CSS source file is here](https://github.com/donovanh/activate/blob/gh-pages/stylesheets/animations.css).

## Pull requests

Pull requests are most welcome. The `master` branch should be cloned and used as the basis of any work, rather than the `gh-pages` branch which is for the public site only.

## License

MIT