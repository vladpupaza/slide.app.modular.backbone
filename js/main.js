require.config({
	baseUrl:'',
	paths: {
		jquery: 'js/libs/jquery/jquery-1.8.3',
		underscore: 'js/libs/underscore/underscore-min',
		backbone: 'js/libs/backbone/backbone-optamd3-min'
	}
});

require(['js/modules/slideModules/slide'], function(slide){
  alert('merge acum?');
  a = new slide;
});
require(['js/modules/appViews/toolbarView.js'], function(ToolbarView){
  alert('merge ?');
  a = new ToolbarView;
});