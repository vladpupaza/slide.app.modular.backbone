/*global define:false*/
define(['jquery','underscore','backbone','js/modules/appViews/saveFeatures'],function($,_,Backbone,toolbarAndSaveFeature) {
"use strict";
/*global alert:false*/
var slideshow =toolbarAndSaveFeature.extend({
    events: function() {
        return _.extend({},toolbarAndSaveFeature.prototype.events,{
        /**
         * @event click
        * Fires when slideshowBtn is clicked
        * @param {Button} this
        * @param {EventObject} e slideshow        
        */    
        "click #slideshowBtn":"startSlideshow"
        }); 
    },
   startSlideshow: function() {
        if (window.Application.slideModulesObj.slides.length === 0) {            
            alert("No slides to be shown");
        } else {     
            $("#slideshowMode").css('visibility','visible');
            this.nextSlide(0,this); 
        }
    },
/**
*@method
*@ hides slideshow notify bar
*/
    hideSlideshowBar: function(i,slidesLength,timer){
        if (i === slidesLength-1) {
            clearInterval(timer);
            $("#slideshowMode").css('visibility','hidden');
        }
    },
/**
* @method
* @shows the next slide
*/
    nextSlide: function(i,that){
        var timer = setInterval(function () {
            window.Application.sidebarViewObj.setCurrentSlide(i);
            window.location.href=('#/slide/'+window.Application.slideModulesObj.slides.at(i).id);
            that.hideSlideshowBar(i,window.Application.slideModulesObj.slides.length,timer);           
        i++;
        },4000);
    }
});
return slideshow;
});