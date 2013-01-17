define(['underscore', 'backbone','js/modules/appViews/appViewTemplate'], function(_, Backbone,typeTemplate) {
//TypeView View
var TypeView=Backbone.View.extend({
		el:$("#typebar"),
		tagName:'div',
		curr:"typeText",
		currentType:"Text",
		template:_.template(typeTemplate.typebar_template),
		initialize: function(){
				this.render();
			},
         
         /**
         * @method
         * render the toolbarView from the appViewTemplate
         **/
		render: function(){     
           this.el.html( this.template().toString());
          },
          
		 /**
         * @method
         * binding events
         **/
		events:{
				"click #typeImage": "typeImage",
				"click #typeText": "typeText",
				"click #typeVideo": "typeVideo"
			},
          
        /**
         * @method
         * select the current type and highlight it in UI
         **/
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
            
         /**
         * @method
         * @gets current type
         **/
		getCurrentType: function(){
			return this.currentType;
		}
		
	});
	return TypeView;
})
	