// Avoid `console` errors in browsers that lack a console.
(function () {
    'use strict';

    var method,
        noop = function () { return; },
        methods = [
            'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
            'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
            'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
            'timeStamp', 'trace', 'warn'
        ],
        length = methods.length,
        console = window.console || {};

    while (length) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }

        length -= 1;
    }
}());

// Place any jQuery/helper plugins in here.

/**
 * AnchorJS v4.1.0 options and selector
 */

(function () {
  'use strict';

  anchors.options = {
    placement: 'right',
    visible: 'hover'
  }

  anchors.add('.cnt-two-col__content > h1, .cnt-two-col__content > h2, .cnt-two-col__content > h3, .cnt-two-col__content > h4, .cnt-two-col__content > h5, .cnt-two-col__content > h6');

})();
