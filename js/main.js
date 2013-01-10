//......here we config require.........................................
require.config({
//......sets the base url..............................................
  baseUrl:'',
//......here we define the paths to jquery, underscore, backbone, .....
//......localstorage and order.........................................
  paths: {
    jquery: 'js/libs/jquery/jquery-1.8.3',
    underscore: 'js/libs/underscore/underscore-min',
    backbone: 'js/libs/backbone/backbone-optamd3-min',
    localStorage: 'js/libs/backbone/localstorage',
    order: 'js/libs/require/order'
  }
});

 
require(['js/modules/appViews/appView'], function(appView){
//.....we create a appView object that is used to render the app........
  var appViewObj = new appView(); 
});
