define(['jquery', 'underscore', 'backbone','js/modules/appViews/appViewTemplate','js/libs/pubsub'],
function($,_,Backbone,toolbarTemplate,pubSub){
/**
* @cfg ToolbarView extends Backbone.View
*/
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
    var savedPresentation = localStorage.getItem("presentations");
        if (typeof savedPresentation === 'string') {
            //if theres something in the local storage load it in our Collection of slides
            var savedPresentationTitles = JSON.parse(savedPresentation);
            var l = savedPresentationTitles.length;
            for(var i=0; i<l; i++) {
                $('#presentationOption').append('<option value="'+savedPresentationTitles[i]+'">'
                    +savedPresentationTitles[i]+'</option>');
            }          
        }
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
    * Fires when languageOption is clicked
    * @param {Select} this
    * @param {EventObject} e selectLanguage        
    */    
        "change #languageOption ": "selectLanguage",
    /**
    * @event click
    * Fires when presentationOption is clicked
    * @param {Select} this
    * @param {EventObject} e selectPresentation       
    */    
        "change #presentationOption ": "selectPresentation",
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
    newPresentation : function() {
    /**
    * @method    
    */
        slideModulesObj.slides.reset(); 
        $('#content').html('');
        this.el.find('#presentationOption').val('Select Presentation').attr('selected',true);
    },
    addSlide : function() { 
    /**
    * @method    
    */
        pubSub.publish("addNewSlide");
    },
    removeSlide : function() { 
    /**
    * @method    
    */
        if (slideModulesObj.slides.length !== 0) { 
            pubSub.publish("removeCurrentSlide");  
        }
    },
    addImage : function() { 
    /**
    * @method    
    */
        pubSub.publish("addImageToSlide");   
    },
    removeImage : function(){ 
    /**
    * @method    
    */
        pubSub.publish("removeImageFromSlide");    
    },
    addVideo : function() { 
    /**
    * @method    
    */
        pubSub.publish("addVideoToSlide"); 
    },
    removeVideo : function() {
    /**
    * @method    
    */
        pubSub.publish("removeVideoFromSlide");
    },
    // method that calls the testImage method or testVideo method
    getUrl : function(){
        var urlNou = this.el.find("#myTextAreaUrl").val();
        if (currentSlide.get("_type") === "Image") {
            this.testImage(urlNou);
        } else {
            this.testVideo(urlNou);
        }
    },
    testVideo: function(urlNou){
        if (this.validateUrl(urlNou)) {
            pubSub.publish("getUrl",urlNou);
            this.hideHelpers();
        } else {
            alert("Please insert a valid URL");
        }
    },
    testImage: function(urlNou){
        this.showHelpers(urlNou);
        var image = $($("#testImg").html());
        this.loadTestImage(image,urlNou);
    },
    loadTestImage: function(image,urlNou){
        var that = this;
        image.load(function () {    
            pubSub.publish("getUrl",urlNou);
            that.hideHelpers();
        }).error(that.imageLoadError);
    },
    showHelpers: function(urlNou){
        $("#toolbar label").html("Please wait...");
        $("#spinner").show();
        $("#testImg img").attr("src",urlNou);
    },
    hideHelpers: function(){
        $("#wrapper").hide();
        $("#spinner").hide();
        $("#toolbar label").html("");
        $("#testImg img").attr("src","");
    },
    imageLoadError: function(){
        $("#spinner").hide();
        $("#toolbar label").html("");
        alert("Please insert a valid URL");
        $("#testImg img").attr("src","");
    },
    //validates new url
    validateUrl : function(url) {
        var urlPattern = new RegExp('(http|ftp|https)://[a-z0-9\-_]+(\.[a-z0-9\-_]+)+([a-z0-9\-\.,@\?^=%&;:/~\+#]*[a-z0-9\-@\?^=%&;/~\+#])?', 'i');
        if (urlPattern.test(url)) {
                return true;
        } else {
            return false;
        }    
    },
    cancelUrl : function() {
        /**
        * @method    
        */
        $("#wrapper").hide();
        $("#spinner").hide();
    },
    notification : (function() {
        var instance;
        function init() {
            return {
                sendSaveNotification : function(message) {
                /**
                * sets text to notfification bar and makes it visible
                */
                    $("#notifBar").html(message);
                    $("#notifBar").css("visibility","visible");
                    setTimeout(function hide() {
                    $("#notifBar").css("visibility","hidden");
                    },4000);          
                },
                AddZero : function(num) {
                    return (num >= 0 && num < 10) ? "0" + num : num + "";
                }     
            };
        }
        return {
            getInstance : function() {       
                if ( !instance ) {
                    instance = init();
                }
                return instance;
            }   
        }; 
    })(),
    save : function() {
    /**
    * @method    
    */
        var currentDate = new Date();
        var currentPresentation = $("#presentationOption").val();
        if (currentPresentation !== 'Select Presentation') {
            localStorage.setItem(currentPresentation,JSON.stringify(slideModulesObj.slides));
            var n = this.notification.getInstance();
            var saveString = "Saved at "+n.AddZero(currentDate.getHours())+":"
                +n.AddZero(currentDate.getMinutes())+" "+"( "+n.AddZero(currentDate.getDate())
                +"/"+n.AddZero(currentDate.getMonth()+1)+"/"+currentDate.getFullYear()+" )";
            n.sendSaveNotification(saveString);
        } else {
            alert("You should use save as first");
        }
    },
    saveAs:function(){
    /**
    * @method
    */
    var saved=false;
    var name = prompt("Give the name for the presentation","untitled");
        if(name) {
            if (localStorage.getItem("presentations")) {
            // checks if there is something in local storage
                var presentations = JSON.parse(localStorage.getItem("presentations"));
                var gasit = false;
            for (i=0; i<presentations.length; i++) {
                if (presentations[i] === name) {
                    gasit = true;
                }
            }
            if (gasit) {
            //if there is a presentation with the same name alrerady saved,
            //asks for confirmation to replace it
                var g = confirm("Are you sure you want to replace this presentation?");
                if (g) {
                    localStorage.setItem('presentations',JSON.stringify(presentations));
                    localStorage.setItem(name,JSON.stringify(slideModulesObj.slides));
                } else {
                    this.saveAs();
                }
            } else {
                presentations.push(name);
                localStorage.setItem('presentations',JSON.stringify(presentations));
                localStorage.setItem(name,JSON.stringify(slideModulesObj.slides));
                this.render(); 
                this.el.find('#presentationOption').val(name).attr("selected",true); 
                saved=true;
            }

        } else {   
            //if local storage is empty creates an array with presentation names 
            //and adds the current presentation to local storage
            var firstPresentation = [name];
            localStorage.setItem('presentations',JSON.stringify(firstPresentation));
            localStorage.setItem(name,JSON.stringify(slideModulesObj.slides));
            this.render();  
            this.el.find('#presentationOption').val(name).attr("selected",true);
            saved=true;
        }
        }
        if (saved) {
            //if the presentation is saved show a notification bar
            var currentDate = new Date();
            var n = this.notification.getInstance();
            var saveString = name+":Saved at "+n.AddZero(currentDate.getHours())+":"
                +n.AddZero(currentDate.getMinutes())+" "+"( "+n.AddZero(currentDate.getDate())+"/"
                +n.AddZero(currentDate.getMonth()+1)+"/"+currentDate.getFullYear()+" )";
            n.sendSaveNotification(saveString);
        }
        
    },
    selectPresentation : function() {
        if (this.el.find("#presentationOption").val() !== 'Select Presentation') {
		    pubSub.publish("change presentation",this.el.find("#presentationOption").val());
        }
    },
    slideshow : function() {
        var i = 0;  
        var nr=slideModulesObj.slides.length;  
        if (nr === 0) {            
            alert("No slides to be shown");
        } else {     
            $("#slideshowMode").css('visibility','visible');
            var timer = setInterval(function () {
                sidebarViewObj.setCurrentSlide(slideModulesObj.slides.at(i),i);
                if (i === nr-1) {
                    clearInterval(timer);
                    $("#slideshowMode").css('visibility','hidden');
                }
                i++;
            },4000);
        }
    }
});

return ToolbarView;
});