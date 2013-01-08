define(['underscore', 'backbone','js/modules/appViews/appViewTemplate'], function(_, Backbone,typeTemplate) {
//console.log(toolbarTemplate);
var TypeView=Backbone.View.extend({
		el:$("#typebar"),
		tagName:'div',
		curr:"typeText",
		currentType:"none",
		template:_.template(typeTemplate.typebar_template),
		initialize: function(){
				this.render();
			},
		render: function(){
                           
           this.el.html( this.template().toString());
           
          },
		events:{
				"click #typeImage": "typeImage",
				"click #typeText": "typeText",
				"click #typeVideo": "typeVideo"
			},
		
		typeImage: function(){
			//removeClass().addClass("slideType");
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
		getCurrentType: function(){
			return this.currentType;
		}
		
	});
	return TypeView;
})
	