define([
	'underscore',
	'backbone',
	'js/libs/pubsub',
	'js/modules/slideModules/bigSlideView'
	], 
function(_, Backbone,pubSub,bigslide) {

/* @class ContentView the class of content view
 * @extends Backbone.View
 * @param  as param recives the model of the curent slide
     */
var contentView = Backbone.View.extend ({
	el:'#content',
	tagName:'div',
	initialize:function(){
		_.bindAll(this,'render');  
	},
	render:function(data){
		if(data.id){
			var obj=slideModulesObj.slides.get(data.id);
			var slide=new bigslide({model:obj});
			$(this.el).html(slide.render().el);
			
		}
	} 
});
return contentView;
});


