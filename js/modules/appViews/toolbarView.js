define(['jquery', 'underscore', 'backbone','js/modules/appViews/appViewTemplate','js/modules/slideModules/slides', 'js/libs/pubsub'],
function($,_,Backbone,toolbarTemplate,slideCollection,pubSub){
ToolbarView = Backbone.View.extend({

initialize: function(){
            this.render();
          },
template:_.template(toolbarTemplate.toolbar_buttons) ,         
render: function(){
          
                  
           this.el.html( this.template().toString());
           
          },
events: {
    "click #addSlideBtn" : "addSlide",
    "click #removeSlideBtn" : "removeSlide",
    "click #addImageToSlideBtn" : "addImage",
    "click #removeImageFromSlideBtn" : "removeImage",
    "click #addVideoBtn" : "addVideo",
    "click #removeVideoBtn" : "removeVideo",
    "click #saveBtn" : "save",
    "change #languageOption ": "selectLanguage",
    "click #addImageUrlBtn" : "getUrl"     
},
//......Adding a slide....................................................
addSlide : function(){ 
    window.slides.addSlide();

},
//.......Remove a slide...................................................
removeSlide : function() { 
     
  //  var currentSlideId = $(".currentSlide").attr("id");
  //  var currentSlide=slides.at(currentSlideId);
    slides.remove(currentSlide);

},
//........Add image.......................................................
addImage : function() { 
    $("#wrapper").show();
   // var currentSlideId = $(".currentSlide").attr("id");
   // var currentSlide=slides.at(currentSlideId);
    var tip=currentSlide.getType();
    if(tip === "Video"||tip === "Text")
     $("#wrapper").hide();
      
},
//.........Remove image...................................................
removeImage : function(){ 
    currentSlide.setUrl("");
    alert("remove Image");

},
//.........Add video......................................................
addVideo : function(){ 
    $("#wrapper").show(); 
    
   // var currentSlideId = $(".currentSlide").attr("id");
   // var currentSlide=slides.at(currentSlideId);
    
    var tip=currentSlide.getType();
    if(tip === "Image"||tip === "Text")
     $("#wrapper").hide();
},
//.........getUrl.........................................................
getUrl : function(){
    var urlNou = $('#myTextAreaUrl').val();
    pubSub.publish("getUrl",urlNou);
    $("#wrapper").hide();
},
//.........removeVideo....................................................
removeVideo : function(){
    currentSlide.setUrl("");
    alert("remove Video");
},
//..........save..........................................................
save: function(){alert("save");},
//...........selectLanguage...............................................
selectLanguage: function(e){alert("Select:"+$(e.currentTarget).val()); }
});

return ToolbarView;
});