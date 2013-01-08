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
  console.log(a);
  z=new contentView({model:a});
});

require(['js/modules/appViews/toolbarView'], function(toolbar){
 
 var t = new toolbar({ el: $("#toolbar")});
});

require(['js/modules/slideModules/slides'], function(slides){
 
  z=new slides();
});

require(['js/modules/slideModules/slides','js/modules/appViews/sidebarView'], function(slides,sidebarView){

 var arr=new slides([a]);
 var s = new sidebarView({collection:arr});
});