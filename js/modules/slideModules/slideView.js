define([
  'jquery',
  'underscore',
  'backbone',
  'js/modules/slideModules/slideTemplate'
  ],

  function($, _, Backbone, slideTemplate){


  var slideView = Backbone.View.extend({

  	//....a silde is a div
    el: $("#sidebar"),
  	tagName: 'div',

  	//....cache the template for a single item

  	template: _.template(slideTemplate.slide_img), //..... where is my template ???

  	events: {
  					
  	},

  	initialize: function() {
      //this.model.on('change', this.render, this);
      //this.model.view = this;
      this.render
      console.log("should render")

    },
    render: function() {
      $(this.el).append(this.template)
      console.log("should append")
      
    }
       
})
  return slideView;
});

