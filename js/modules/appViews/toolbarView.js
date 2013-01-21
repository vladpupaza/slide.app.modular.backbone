/*global define:false*/
define(['jquery', 'underscore', 'backbone','js/modules/appViews/appViewTemplate','js/libs/pubsub','bootstraps','js/modules/appViews/slideshow'],
function($,_,Backbone,toolbarTemplate,pubSub){
/**
* @cfg ToolbarView extends Backbone.View
*/
"use strict";
/*global confirm:false*/
/*global alert:false*/
/*global prompt:false*/
/*global Application:false*/
var  ToolbarView = Backbone.View.extend ({
    /**
    * @property
    * @type html element  
    */ 
    el : $("#toolbar"),
    initialize : function(){
        this.render();
    },
    /**
    * @template 
    */
    template : _.template(toolbarTemplate.toolbar_buttons),         
    render : function(){
    /**
    * @method 
    */
    this.el.html( this.template().toString());
    },
    /**
    * @property defines all the toolbar events
    */
    events: {
    /**
    * @event click
    * Fires when addSlideBtn is clicked
    * @param {Button} this
    * @param {EventObject} e addSlide        
    */
        "click #newPresentationBtn" : "newPresentation",    
    /**
    * @event click
    * Fires when addSlideBtn is clicked
    * @param {Button} this
    * @param {EventObject} e addSlide        
    */
        "click #addSlideBtn" : "addSlide",
    /**
    * @event click
    * Fires when removeSlideBtn is clicked
    * @param {Button} this
    * @param {EventObject} e removeSlide        
    */    
        "click #removeSlideBtn" : "removeSlide",
    /**
    * @event click
    * Fires when addImageToSlideBtn is clicked
    * @param {Button} this
    * @param {EventObject} e addImage        
    */    
        "click #addImageToSlideBtn" : "addImage",
    /**
    * @event click
    * Fires when removeImageFromSlideBtn is clicked
    * @param {Button} this
    * @param {EventObject} e removeImage        
    */    
        "click #removeImageFromSlideBtn" : "removeImage",
    /**
    * @event click
    * Fires when addVideoBtn is clicked
    * @param {Button} this
    * @param {EventObject} e addVideo        
    */    
        "click #addVideoBtn" : "addVideo",
    /**
    * @event click
    * Fires when removeVideoBtn is clicked
    * @param {Button} this
    * @param {EventObject} e removeVideo        
    */    
        "click #removeVideoBtn" : "removeVideo",
   
    /**
    * @event click
    * Fires when addImageUrlBtn is clicked
    * @param {Button} this
    * @param {EventObject} e getUrl        
    */    
        "click #addImageUrlBtn" : "getUrl",
    /**
    * @event click
    * Fires when cancelImageUrlBtn is clicked
    * @param {Button} this
    * @param {EventObject} e cancelUrl        
    */    
        "click #cancelImageUrlBtn" : "cancelUrl",
    /**
    * @event click
    * Fires when slideshowBtn is clicked
    * @param {Button} this
    * @param {EventObject} e slideshow        
    */    
        "click #slideshowBtn":"slideshow" 
    },
    /**
    * @method    
    */
    newPresentation: function() {
    
        window.Application.slideModulesObj.slides.reset(); 
        $('#content').html('');
        this.el.find('#presentationOption').val('Select Presentation').attr('selected',true);
    },
     /**
    * @method    
    */
    addSlide: function() { 
   
        pubSub.publish("addNewSlide");
    },
    /**
    * @method    
    */
    removeSlide: function() { 
    
        if (window.Application.slideModulesObj.slides.length !== 0) { 
            pubSub.publish("removeCurrentSlide");  
        }
    },
    /**
    * @method    
    */
    addImage: function() { 
    
        pubSub.publish("addImageToSlide");   
    },
    /**
    * @method    
    */
    removeImage: function(){ 
    
        pubSub.publish("removeImageFromSlide");    
    },
    /**
    * @method    
    */
    addVideo: function() { 
    
        pubSub.publish("addVideoToSlide"); 
    },
    /**
    * @method    
    */
    removeVideo: function() {
    
        pubSub.publish("removeVideoFromSlide");
    },
    /**
    * @method    
    * @ that calls the testImage method or testVideo method
    */
    getUrl : function(){
    
        var urlNou = this.el.find("#myTextAreaUrl").val();
        if (Application.currentSlide.get("_type") === "Image") {
            this.testImage(urlNou);
        } else {
            this.testVideo(urlNou);
        }
    },
     /**
    * @method    
    * @ that tests the video url
    */
    testVideo: function(urlNou){
   
        if (this.validateUrl(urlNou)) {
            pubSub.publish("getUrl",urlNou);
            this.hideHelpers();
        } else {
            alert("Please insert a valid URL");
        }
    },
    /**
    * @method    
    * @ that tests the image url
    */
    testImage: function(urlNou){
    
        this.showHelpers(urlNou);
        var image = $($("#testImg").html());
        this.loadTestImage(image,urlNou);
    },
     /**
    * @method    
    * @ loads test image
    */
    loadTestImage: function(image,urlNou){
   
        var that = this;
        image.load(function () {    
            pubSub.publish("getUrl",urlNou);
            that.hideHelpers();
        }).error(that.imageLoadError);
    },
    /**
    * @method    
    * @ shows spinners, labels and insersts url to the test img tag
    */
    showHelpers: function(urlNou){
    
        $("#toolbar label").html("Please wait...");
        $("#spinner").show();
        $("#testImg img").attr("src",urlNou);
    },
    /**
    * @method    
    * @ hides the wrapper,spinner,label, and empties the url of the test img tag
    */
    hideHelpers: function(){
    
        $("#wrapper").hide();
        $("#spinner").hide();
        $("#toolbar label").html("");
        $("#testImg img").attr("src","");
    },
    /**
    * @method    
    * @ shows error alert
    */
    imageLoadError: function(){
    
        $("#spinner").hide();
        $("#toolbar label").html("");
        alert("Please insert a valid URL");
        $("#testImg img").attr("src","");
    },
    /**
    * @method    
    * @ validates new url
    */
    validateUrl: function(url) {
        var i;
        var urlPattern = new RegExp('(http|ftp|https)://[a-z0-9\\-_]+(\\.[a-z0-9\\-_]+)+([a-z0-9\\-\\.,@\\?^=%&;:/~\\+#]*[a-z0-9\\-@\\?^=%&;/~\\+#])?', i);
        if (urlPattern.test(url)) {
                return true;
        } else {
            return false;
        }    
    },
    /**
    * @method   
    * @ hides the wrapper and the spinner        
    */
    cancelUrl: function() {
       
        $("#wrapper").hide();
        $("#spinner").hide();
    }, 
    /**
    * @method
    * @checks starts the presentation if there are slides in it
    */
    slideshow : function() {
        Application.slideshow();
    }
});

return ToolbarView;
});