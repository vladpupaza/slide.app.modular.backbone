define(['underscore', 'backbone','js/modules/slideModules/slide'], function(_, Backbone,slide) {
	var Slides = Backbone.Collection.extend({
		model:slide,
		
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