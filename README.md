# Activate

A tool to easily set up animated regions on a web page that activate as the user scrolls.

Note: This is an early work in progress and not suitable for use in general yet.

For more information, see [hop.ie/activate](http://hop.ie/activate).

## Usage

To enable the script on a page, include a reference to the plugin and then run the "init" method.

Something like this:

    <script src="/javascripts/activate.js"></script>
    <script>
      activate.init();
    </script>

## Avoiding a flash of visible content

Setting any "js-activate" class elements to have `opacity: 0` is a quick way to ensure they are invisible on load. If you do this, make sure to override this style in a `noscript` section on your page so that non-JS viewers can see the content.

### License

MIT