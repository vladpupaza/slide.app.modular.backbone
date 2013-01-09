define(['underscore', 'backbone','js/modules/slideModules/slide','localStorage','js/libs/pubsub'], function(_, Backbone,slide,_localStorage,pubSub) {
	var z=_localStorage;
	var Slides = Backbone.Collection.extend({
        initialize : function(){
         var t = new slide;
         var token= pubSub.subscribe('getUrl', t.subscriber); 
        },
		model:slide,/* 
		url:'slide', */
		localStorage:new Store('cosmin_Slides'),
		
		
		addSlide: function(){
			var that=this;
			require(['js/modules/slideModules/slide','js/modules/appViews/contentView'], function(slide,contentView){
			var sl = new slide;
			sl.setType(typeViewObj.getCurrentType());
 

			slides.add(sl);
			sl.save();
			console.log("POST ../slides");

 
			});
		}
	});
	return Slides;
});