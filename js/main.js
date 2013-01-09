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


 
define(['underscore', 'backbone','js/modules/slideModules/slide','js/modules/appViews/contentView'], function(_, Backbone,slide,contentView) {


 
		a = new slide({id:'10'});
		a.setText('Dany');
		a.setType('Image');
		
		b =  new slide({id:'11'});
		b.setText('Cosmin');
		
		c =  new slide({id:'12'});
		c.setText('Radu');
	 
		
		 var slideRouter = Backbone.Router.extend({
			routes: {
				"":"",
				"slide/:id": "viewSlide",
				"slide/:id/edit": "editSlide"
				// ... other routes
			},
			
			viewSlide: function(id){
				console.log("View slide requested.");
				this.navigate("slide/" + id + '/edit'); // updates the fragment for us, but doesn't trigger the route
			},
			editSlide: function(id) {
				console.log("Edit slide openned.");
			}
		});
		
		 myRouter = new slideRouter();
		
		 Backbone.history.start(); 
	divMove=	
	function (e){ 
		var div = document.getElementById('draggebel'); 
		div.style.top =( e.clientY -100)+ 'px';
		div.style.left =( e.clientX -200)+ 'px';
	};
 


});

require(['js/modules/appViews/toolbarView'], function(toolbar){
 
 var t = new toolbar({ el: $("#toolbar")});
});



require(['js/modules/slideModules/slides','js/modules/appViews/sidebarView'], function(slides,sidebarView){


 //arr=new slides([a,b]);
 //arr.add(b);

 var s = new sidebarView({collection:window.slides});


});

require(['js/modules/appViews/typeView'], function(TypeView){
  //alert('hhh');
  t= new TypeView();

});

require(['js/modules/slideModules/slides'], function(Slides){
  //alert('hhh');
  slides=new Slides();


});

