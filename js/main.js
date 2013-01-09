require.config({
  baseUrl:'',
  paths: {
    jquery: 'js/libs/jquery/jquery-1.8.3',
    underscore: 'js/libs/underscore/underscore-min',
    backbone: 'js/libs/backbone/backbone-optamd3-min',
    localStorage: 'js/libs/backbone/localstorage',
    order: 'js/libs/require/order'
  }
});

 
require(['js/modules/appViews/appView'], function(appView){
  var appViewObj = new appView; 
});
