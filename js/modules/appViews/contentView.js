define(['underscore', 'backbone','js/libs/pubsub'], 
function(_, Backbone,pubSub) {

/* @class ContentView the class of content view
 * @extends Backbone.View
 * @param  as param recives the model of the curent slide
     */
var contentView = Backbone.View.extend ({ 
	el:'#content',
	listener:function(){
		pubSub.subscribe('content',this.render);
	},
	initialize:function(){},
	render:function(topic,data){
		this.el.innerHTML=data;
	} 
});
return contentView;
});


