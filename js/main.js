require.config({
	baseUrl:'',
	paths: {
		jquery: 'js/libs/jquery/jquery-1.8.3',
		underscore: 'js/libs/underscore/underscore-min',
		backbone: 'js/libs/backbone/backbone-optamd3-min'
	}
});

 

require(['js/modules/slideModules/slide','js/modules/slideModules/slideView'], function(slide,slideView){
 
 var a = new slide;
 var b = new slideView({model:a})
 b.render();
 var c = new slideView({model:a})
 c.render();
 var d = new slideView({model:a})
 d.render();

});
require(['js/modules/slideModules/slide','js/modules/appViews/contentView'], 
	function(slide,contentView){
 
  a = new slide;
  console.log(a);
  z=new contentView({model:a});
});

require(['js/modules/appViews/toolbarView'], function(toolbar){
 
 var t = new toolbar({ el: $("#toolbar")});
});