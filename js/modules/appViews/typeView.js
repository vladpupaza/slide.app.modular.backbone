define(['underscore', 'backbone','js/modules/appViews/appViewTemplate'], function(_, Backbone,typeTemplate) {
//typeView View
var TypeView=Backbone.View.extend({
		el:$("#typebar"),
		tagName:'div',
		curr:"typeText",
		currentType:"Text",
		template:_.template(typeTemplate.typebar_template),
		initialize: function(){
				this.render();
			},
		//here we render the toolbarView from the appViewTemplate
		render: function(){     
           this.el.html( this.template().toString());
          },
		 //binding events
		events:{
				"click #typeImage": "typeImage",
				"click #typeText": "typeText",
				"click #typeVideo": "typeVideo"
			},
		//here we select the current type and we highlight it in UI
		typeImage: function(){
				$("#"+this.curr).removeClass().addClass("slideType");
				this.curr="typeImage";
				$("#"+this.curr).removeClass().addClass("slideType currentSlideType");
				this.currentType="Image";
			},
		typeText: function(){
				$("#"+this.curr).removeClass().addClass("slideType");
				this.curr="typeText";
				$("#"+this.curr).removeClass().addClass("slideType currentSlideType");
				this.currentType="Text";
			},
		typeVideo: function(){
				$("#"+this.curr).removeClass().addClass("slideType");
				this.curr="typeVideo";
				$("#"+this.curr).removeClass().addClass("slideType currentSlideType");
				this.currentType="Video";
			},
		//current type getter
		getCurrentType: function(){
			return this.currentType;
		}
		
	});
	return TypeView;
})
	