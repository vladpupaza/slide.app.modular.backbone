require.config({
	baseUrl:'',
	paths: {
		jquery: 'js/libs/jquery/jquery-1.8.3',
		underscore: 'js/libs/underscore/underscore-min',
		backbone: 'js/libs/backbone/backbone-optamd3-min'
	}
});

 

require(['js/modules/slideModules/slide'], function(slide){
 
 var a = new slide;
});
require(['js/modules/slideModules/slide','js/modules/appViews/contentView'], function(slide,contentView){
 
  a = new slide;
  z=new contentView({model:a});
});
