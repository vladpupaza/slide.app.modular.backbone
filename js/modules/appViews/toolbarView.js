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
    * Fires when saveBtn is clicked
    * @param {Button} this
    * @param {EventObject} e save        
    */    
        "click #saveBtn" : "save",
    /**
    * @event click
    * Fires when saveasBtn is clicked
    * @param {Button} this
    * @param {EventObject} e save        
    */    
        "click #saveAsBtn" : "saveAs",
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
    *@method 
    * sets text to notfification bar and makes it visible
    */  
    sendSaveNotification: function(message) {
       
        $("#notifBar").html(message);
                    $("#notifBar").css("visibility","visible");
                    setTimeout(function hide() {
                    $("#notifBar").css("visibility","hidden");
                    },4000);          
    },
    /**
    * @method    
    *
    */ 
    addZero : function(num) {
                    return (num >= 0 && num < 10) ? "0" + num : num + "";
    },
    /**
    * @method    
    *
    */                
    save : function() {
        localStorage.setItem(window.Application.currentPresentation,JSON.stringify(window.Application.slideModulesObj.slides));
        this.saveMessage(window.Application.currentPresentation);     
       
    },
    /**
    * @method    
    *
    */ 
    saveMessage: function(name){
        var currentDate = new Date();
        var saveString = name+" was saved at "+this.addZero(currentDate.getHours())+":"+
            this.addZero(currentDate.getMinutes())+" "+"( "+this.addZero(currentDate.getDate())+"/"+
            this.addZero(currentDate.getMonth()+1)+"/"+currentDate.getFullYear()+" )";
        this.sendSaveNotification(saveString);
    },
    /**
    * @method    
    *
    */ 
    unicPresentation: function(presentations,l,name){
        for (var i=0; i<l; i++) {
            if (presentations[i] === name) {
                return true;
            }
        }    
        return false;         
    },
    /**
    * @method    
    *
    */ 
    confirmRename: function(name,presentations) {
        if (confirm("Are you sure you want to replace this presentation?")) {
            localStorage.setItem('presentations',JSON.stringify(presentations));
            localStorage.setItem(name,JSON.stringify(window.Application.slideModulesObj.slides));
            pubSub.publish("setCurrentPresentation",name);
        } else {
            this.saveAs();
        }
    },
    /**
    * @method    
    *
    */ 
    addNewPresentation: function(presentations,name) {
        presentations.push(name);
        localStorage.setItem('presentations',JSON.stringify(presentations));
        localStorage.setItem(name,JSON.stringify(window.Application.slideModulesObj.slides));
        pubSub.publish("presentationAdded",name);
    },
    /**
    * @method    
    *
    */ 
    firstPresentation: function(name) {
        var firstPresentation = [name];
        localStorage.setItem('presentations',JSON.stringify(firstPresentation));
        localStorage.setItem(name,JSON.stringify(window.Application.slideModulesObj.slides));
        pubSub.publish("presentationAdded",name);
    },
    /**
    * @method    
    *
    */ 
    checkingPresentations: function(name){
        // checks if there is something in local storage
        var presentations = JSON.parse(localStorage.getItem("presentations"));
        if (this.unicPresentation(presentations,presentations.length,name)) {
        //if there is a presentation with the same name alrerady saved,
        //asks for confirmation to replace it
            this.confirmRename(name,presentations);
        } else {
            this.addNewPresentation(presentations,name);
            return true;
        }
    },
    /**
    * @method    
    *
    */ 
    savePresentation: function(name){
        if (name) {
            if (localStorage.getItem("presentations")) {
                return this.checkingPresentations(name);

            } else {   
                //if local storage is empty creates an array with presentation names 
                //and adds the current presentation to local storage
                this.firstPresentation(name);
                return true;
            }
        }
        return false;
    },
    /**
    * @method    
    *
    */ 
    saveAs: function(){
    var name = prompt("Give the name for the presentation","untitled");
        if (this.savePresentation(name)) {
            //if the presentation is saved show a notification bar
            this.saveMessage(name);
        }
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