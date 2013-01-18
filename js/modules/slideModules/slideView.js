/*global define:false*/
define([
'jquery',
'underscore',
'backbone',
'js/modules/slideModules/slideTemplate'
],

function ($, _, Backbone, slideTemplate){
    

    "use strict";
    /*global console:false*/

    /**
    *@class SlideView View for a Slide Model
    *@extends Backbone.View
    *@constructor
    */
    // defines the view of a slide  
    var SlideView = Backbone.View.extend({
    /**
    *@property
    *@type string
    */
    tagName: 'div',//a silde is a div
     /**
    *@property
    *@type string
    */
    template:'',
    //initialize function for slideView, called whenever a new slideView is created, a slide view should be created for every slide model
    /**
    *@method
    */

 
 
    initialize: function () { 
 		 //bind the change event to this view's render function, so every time a model is changed the view is updated
        this.model.bind('change',function (){this.render();console.log('PUT ../slides/'+this.model.id);},this);
        //set this model's view to point to this object
        this.model.view = this;
        //render this view 
        this.render();
    },
    /**
    *@method
    *@return this.renders(this.model.get("_type")) Returns whatever the call to renders returns 
    */
    //render function for slideView used to call renders function that takes as a parameter the type of slide to be rendered 
    render: function () {
        return this.renders(this.model.get("_type"));
    },

    /**
    *@method
    *@return this.el Returns the el with the compiled template as it's html value
    */
    //renders takes as a parameter the type of slide to be rendered, based on that it selects the required template from slideTemplate 
    renders: function(tip){
        this.template= _.template(slideTemplate[tip]);
        $(this.el).html(this.template(this.model.toJSON()));
        return this.el.innerHTML;
    }
    });
    return SlideView;
});