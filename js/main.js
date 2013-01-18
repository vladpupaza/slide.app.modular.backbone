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
    namespace:'js/namespace',
    jquery: 'js/libs/jquery/jquery-1.8.3',
    bootstraps: 'js/libs/bootstrap/bootstrap.min',
    underscore: 'js/libs/underscore/underscore-min',
    backbone: 'js/libs/backbone/backbone-optamd3-min',
    localStorage: 'js/libs/backbone/localstorage',
    order: 'js/libs/require/order'
    }
});
require(['js/modules/appViews/appModule','namespace'], function (AppModule) {
/** Sets the idCurrent variable to -1 so that we start the app with no selected slide
 */
    "use strict";
    
    Application.idCurrent = -1;
    Application.currentPresentation;
/** We create a appView object that is used to render the app
 * @property
 * @type object
 */
    Application.appViewObj = new AppModule(); 
});
