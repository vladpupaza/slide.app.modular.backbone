define(['underscore', 'backbone','js/libs/pubsub'], 
function(_, Backbone,pubSub) {

/* @class ContentView the class of content view
 * @extends Backbone.View
 * @param  as param recives the model of the curent slide
     */
var contentView = Backbone.View.extend ({
	el:'#content',
	tagName:'div',
	display:function(data){
		this.render(data);
	},
	initialize:function(){
		_.bindAll(this,'render');  
	},
	render:function(data){
		$(this.el).html(data);
	} 
});
return contentView;
});


