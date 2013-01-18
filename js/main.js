/** Here we config require
 */ 
require.config ( {
/** Sets the base url
 */
    baseUrl:'',
/** Here we define the paths to jquery, underscore, backbone, 
 * localstorage and order.........................................
 */ 
    paths: {
    jquery: 'js/libs/jquery/jquery-1.8.3',
    bootstraps: 'js/libs/bootstrap/bootstrap.min',
    underscore: 'js/libs/underscore/underscore-min',
    backbone: 'js/libs/backbone/backbone-optamd3-min',
    localStorage: 'js/libs/backbone/localstorage',
    order: 'js/libs/require/order'
    }
});

require(['js/modules/appViews/appModule'], function (AppModule) {
/** Sets the idCurrent variable to -1 so that we start the app with no selected slide
 */
    "use strict";
    window.idCurrent = -1;
    window.currentPresentation;
/** We create a appView object that is used to render the app
 * @property
 * @type object
 */
    var appViewObj = new AppModule(); 
});
