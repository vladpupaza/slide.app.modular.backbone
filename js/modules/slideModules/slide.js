define(['underscore', 'backbone','js/libs/pubsub'], function(_, Backbone, pubSub) {
	var Slide = Backbone.Model.extend({
		// defaults attributes for slide 
		defaults: {
			'id':null,
			"_type" : null,
			"_text" : null,
			"_url" :null,
			'_x':'150px',
			'_y':'50px'
			
		},
		initialize:function(){
			this.set({id:Math.random().toString(36).substr(2,9)});
			console.log(this.id);
		},
		// setType method by param type
		setType  : function(type) {
			this.set({ _type : type });
		},
		// setText method by param type
		setText : function(text) {
			this.set({ _text : text });
		},
		// setUrl method by param type
		setUrl : function(url) {
			this.set({ _url : url });
		},
		// getType method -> returns the _type attribute
		getType : function() {
			return this.get('_type');
		},
		// getText method -> returns the _text	attribute
		getText : function() {
			return this.get('_text');
		},
		// getUrl method -> returns the _url attribute
		getUrl : function() {
			return this.get('_url');
		},
        subscriber : function(topic,data)
        {
          console.log(topic+":"+data);
          currentSlide.setUrl(data);
          
          
        }
	});
	return Slide;
});