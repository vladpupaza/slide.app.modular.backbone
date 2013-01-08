require.config({
	baseUrl:'',
	paths: {
		jquery: 'js/libs/jquery/jquery-1.8.3',
		underscore: 'js/libs/underscore/underscore-min',
		backbone: 'js/libs/backbone/backbone-optamd3-min'
	}
});


 

require(['js/modules/slideModules/slide','js/modules/appViews/contentView'], 
	function(slide,contentView){

 
		a = new slide;
		b = new slide;
		a.setType('Image');
		

});

require(['js/modules/appViews/toolbarView'], function(toolbar){
 
 var t = new toolbar({ el: $("#toolbar")});
});





require(['js/modules/appViews/typeView'], function(TypeView){
  //alert('hhh');
  t= new TypeView();

});

require(['js/modules/slideModules/slides'], function(Slides){
  //alert('hhh');
  slides=new Slides();


});

require(['js/modules/appViews/sidebarView'], function(sidebarView){


 slides.addSlide();
 slides.addSlide();
 var s = new sidebarView({collection:slides});


});