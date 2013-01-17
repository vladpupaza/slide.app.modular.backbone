define(['underscore', 'backbone','js/libs/pubsub'], 
function(_, Backbone,pubSub) {

/* @class ContentView the class of content view
 * @extends Backbone.View
 * @param  as param recives the model of the curent slide
     */
var contentView = Backbone.View.extend ({ 
	el:'#content',
	tagName:'div',
	listener:function(){
		var self=this;
		pubSub.subscribe('content',this.render);
	},
	initialize:function(){
		_.bindAll(this,'render','initialize');  
		this.listener();
	},
	render:function(topic,data){
		$(this.el).html(data);
	} 
});
return contentView;
});


