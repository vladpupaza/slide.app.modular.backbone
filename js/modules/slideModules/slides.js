define(['underscore', 'backbone','js/modules/slideModules/slide'], function(_, Backbone,slide) {
	var Slides = Backbone.Collection.extend({
		model:slide
	});
	return Slides;
});