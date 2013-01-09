define([
  'jquery',
  'underscore',
  'backbone',
  'js/modules/slideModules/slideTemplate',
  'js/modules/slideModules/slide'
  ],

  function($, _, Backbone, slideTemplate,slide){


  var slideView = Backbone.View.extend({

  	//....a silde is a div
     
  	tagName: 'div',  

  	events: {
  					
  	},

  	initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.view = this;
      this.render()
      
    },
    render: function() {
      switch(this.model.getType())
      {
      case "Text" :                  
                  var template= _.template(slideTemplate.slide_text)
 
                  $(this.el).html(template(this.model.toJSON()));
 

      break;
      case "Image":
                  var template= _.template(slideTemplate.slide_img)
 
                  $(this.el).html(template(this.model.toJSON()));
 

      break;
      case "Video":
                  var template= _.template(slideTemplate.slide_video)
 
                  $(this.el).html(template(this.model.toJSON()));
 

      break;
      default: alert("no slide type")
      }     
     return this.el;
      
    }   
      
})
  return slideView;
});

