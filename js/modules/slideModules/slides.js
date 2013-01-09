define(['underscore', 'backbone','js/modules/slideModules/slide','localStorage'], function(_, Backbone,slide,_localStorage) {
	var z=_localStorage;
	var Slides = Backbone.Collection.extend({
		model:slide,/* 
		url:'slide', */
		localStorage:new Store('cosmin_Slides'),
		addSlide: function(){
			var that=this;
			require(['js/modules/slideModules/slide','js/modules/appViews/contentView'], function(slide,contentView){
			var sl = new slide;
			sl.setType(t.getCurrentType());
            slides.add(sl);
			});
		}
	});
	return Slides;
});