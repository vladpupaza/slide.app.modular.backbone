define(['jquery', 'underscore', 'backbone','js/modules/appViews/appViewTemplate','js/libs/pubsub','bootstraps'],
function($,_,Backbone,toolbarTemplate,pubSub,bootstraps){
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
    newPresentation: function() {
    /**
    * @method    
    */
        slideModulesObj.slides.reset(); 
        $('#content').html('');
        this.el.find('#presentationOption').val('Select Presentation').attr('selected',true);
    },
    addSlide: function() { 
    /**
    * @method    
    */
        pubSub.publish("addNewSlide");
    },
    removeSlide: function() { 
    /**
    * @method    
    */
        if (slideModulesObj.slides.length !== 0) { 
            pubSub.publish("removeCurrentSlide");  
        }
    },
    addImage: function() { 
    /**
    * @method    
    */
        pubSub.publish("addImageToSlide");   
    },
    removeImage: function(){ 
    /**
    * @method    
    */
        pubSub.publish("removeImageFromSlide");    
    },
    addVideo: function() { 
    /**
    * @method    
    */
        pubSub.publish("addVideoToSlide"); 
    },
    removeVideo: function() {
    /**
    * @method    
    */
        pubSub.publish("removeVideoFromSlide");
    },
    getUrl : function(){
    /**
    * @method    
    * @ that calls the testImage method or testVideo method
    */
        var urlNou = this.el.find("#myTextAreaUrl").val();
        if (currentSlide.get("_type") === "Image") {
            this.testImage(urlNou);
        } else {
            this.testVideo(urlNou);
        }
    },
    testVideo: function(urlNou){
    /**
    * @method    
    * @ that tests the video url
    */
        if (this.validateUrl(urlNou)) {
            pubSub.publish("getUrl",urlNou);
            this.hideHelpers();
        } else {
            alert("Please insert a valid URL");
        }
    },
    testImage: function(urlNou){
    /**
    * @method    
    * @ that tests the image url
    */
        this.showHelpers(urlNou);
        var image = $($("#testImg").html());
        this.loadTestImage(image,urlNou);
    },
    loadTestImage: function(image,urlNou){
    /**
    * @method    
    * @ loads test image
    */
        var that = this;
        image.load(function () {    
            pubSub.publish("getUrl",urlNou);
            that.hideHelpers();
        }).error(that.imageLoadError);
    },
    showHelpers: function(urlNou){
    /**
    * @method    
    * @ shows spinners, labels and insersts url to the test img tag
    */
        $("#toolbar label").html("Please wait...");
        $("#spinner").show();
        $("#testImg img").attr("src",urlNou);
    },
    hideHelpers: function(){
    /**
    * @method    
    * @ hides the wrapper,spinner,label, and empties the url of the test img tag
    */
        $("#wrapper").hide();
        $("#spinner").hide();
        $("#toolbar label").html("");
        $("#testImg img").attr("src","");
    },
    imageLoadError: function(){
    /**
    * @method    
    * @ shows error alert
    */
        $("#spinner").hide();
        $("#toolbar label").html("");
        alert("Please insert a valid URL");
        $("#testImg img").attr("src","");
    },
    
    validateUrl: function(url) {
    /**
    * @method    
    * @ validates new url
    */
        var urlPattern = new RegExp('(http|ftp|https)://[a-z0-9\-_]+(\.[a-z0-9\-_]+)+([a-z0-9\-\.,@\?^=%&;:/~\+#]*[a-z0-9\-@\?^=%&;/~\+#])?', 'i');
        if (urlPattern.test(url)) {
                return true;
        } else {
            return false;
        }    
    },
    cancelUrl: function() {
        /**
        * @method   
        * @ hides the wrapper and the spinner        
        */
        $("#wrapper").hide();
        $("#spinner").hide();
    },   
    sendSaveNotification: function(message) {
        /**
        *@method 
        * sets text to notfification bar and makes it visible
        */
        $("#notifBar").html(message);
                    $("#notifBar").css("visibility","visible");
                    setTimeout(function hide() {
                    $("#notifBar").css("visibility","hidden");
                    },4000);          
    },
    addZero : function(num) {
                    return (num >= 0 && num < 10) ? "0" + num : num + "";
    },               
    save : function() {
    /**
    * @method    
    *
    */           
        if ($("#presentationOption").val() !== 'Select Presentation') {
            localStorage.setItem($("#presentationOption").val(),JSON.stringify(slideModulesObj.slides));
            this.saveMessage($("#presentationOption").val());     
        } else {
            alert("You should use save as first");
        }
    },
    saveMessage: function(name){
        var currentDate = new Date();
        var saveString = name+" was saved at "+this.addZero(currentDate.getHours())+":"+
            this.addZero(currentDate.getMinutes())+" "+"( "+this.addZero(currentDate.getDate())+"/"+
            this.addZero(currentDate.getMonth()+1)+"/"+currentDate.getFullYear()+" )";
        this.sendSaveNotification(saveString);
    },
    unicPresentation: function(presentations,l,name){
        for (i=0; i<l; i++) {
            if (presentations[i] === name) {
                return true;
            }
        }    
        return false;         
    },
 
    confirmRename: function(name,presentations) {
        if (confirm("Are you sure you want to replace this presentation?")) {
            localStorage.setItem('presentations',JSON.stringify(presentations));
            localStorage.setItem(name,JSON.stringify(slideModulesObj.slides));
            pubSub.publish("setCurrentPresentation",name);
        } else {
            this.saveAs();
        }
    },
    addNewPresentation: function(presentations,name) {
        presentations.push(name);
        localStorage.setItem('presentations',JSON.stringify(presentations));
        localStorage.setItem(name,JSON.stringify(slideModulesObj.slides));
        pubSub.publish("presentationAdded",name);
    },
    firstPresentation: function(name) {
        var firstPresentation = [name];
        localStorage.setItem('presentations',JSON.stringify(firstPresentation));
        localStorage.setItem(name,JSON.stringify(slideModulesObj.slides));
        pubSub.publish("presentationAdded",name);
    },
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
  
    saveAs: function(){
    /**
    * @method
    */
        var name = prompt("Give the name for the presentation","untitled");
        if (this.savePresentation(name)) {
            //if the presentation is saved show a notification bar
            this.saveMessage(name);
        }
    },
    hideSlideshowBar: function(i,slidesLength,timer){
    /**
    * @method
    *@ hides slideshow notify bar
    */
        if (i === slidesLength-1) {
            clearInterval(timer);
            $("#slideshowMode").css('visibility','hidden');
        }
    },
    nextSlide: function(i,that){
    /**
    * @method
    * @shows the next slide
    */
        var timer = setInterval(function () {
                sidebarViewObj.setCurrentSlide(slideModulesObj.slides.at(i),i);
                that.hideSlideshowBar(i,slideModulesObj.slides.length,this);           
                i++;
                },4000);
    },
    slideshow : function() {
    /**
    * @method
    * @checks starts the presentation if there are slides in it
    */
        if (slideModulesObj.slides.length === 0) {            
            alert("No slides to be shown");
        } else {     
            $("#slideshowMode").css('visibility','visible');
            this.nextSlide(0,this); 
        }
    }
});

return ToolbarView;
});