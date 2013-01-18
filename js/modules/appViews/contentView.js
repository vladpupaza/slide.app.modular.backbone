define([
	'underscore',
	'backbone',
	'js/libs/pubsub',
	'js/modules/slideModules/bigSlideView'
	], 
function(_, Backbone,pubSub,BigSlide) {
	"use strict";
    /*global Application:true*/
	
/**
 * @class ContentView the class of content view
 * @extends Backbone.View
 * @param  as param recives the model of the curent slide
     */
var contentView = Backbone.View.extend ({
	el:'#content',
	tagName:'div',
	initialize:function(){
		_.bindAll(this,'render');  
	},
	/**
	 *@method
	 */
	render:function(data){
		if(data.id){
			Application.currentSlide=Application.slideModulesObj.slides.get(data.id);
			var slide=new BigSlide({model:Application.currentSlide});
			$(this.el).html(slide.render().el);
		}
	}
});
return contentView;
});


