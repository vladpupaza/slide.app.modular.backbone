define([
'jquery',
'underscore',
'backbone',
'js/modules/slideModules/slideTemplate'
],

  function($, _, Backbone, slideTemplate){
  // defines the view of a slide
  var slideView = Backbone.View.extend({
  //a silde is a div
  tagName: 'div',
  //initialize function for slideView, called whenever a new slideView is created, a slide view should be created for every slide model
  initialize: function() {
    //bind the change event to this view's render function, so every time a model is changed the view is updated
    this.model.bind('change', this.render, this);
    //set this model's view to point to this object
    this.model.view = this;
    //render this view 
    this.render()
  },
  //render function for slideView used to display the view on the page
  render: function() {
    //there are three types of slides so we check what type this view's model has so we know how to render it
    switch(this.model.getType())
    {
    //if it's a text slide we load the slide_text template from the slideTemplate file
    case "Text" :
      var template= _.template(slideTemplate.slide_text)
      $(this.el).html(template(this.model.toJSON()));
      break;
    //if it's an image slide we load the slide_img template from the slideTemplate file
    case "Image":
      var template= _.template(slideTemplate.slide_img)
      $(this.el).html(template(this.model.toJSON()));
      break;
    //if it's a video slide we load the slide_video template from the slideTemplate file
    case "Video":
      var template= _.template(slideTemplate.slide_video)
      $(this.el).html(template(this.model.toJSON()));
    break;
    default: alert("no slide type")
    }
    return this.el;
  }
});
  return slideView;
});

