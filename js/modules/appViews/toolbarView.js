define(['jquery', 'underscore', 'backbone','js/modules/appViews/appViewTemplate','js/modules/slideModules/slides'],
function($,_,Backbone,toolbarTemplate,slideCollection){
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
    var currentSlideId = $(".currentSlide").attr("id");
    var currentSlide=slides.at(currentSlideId);
    slides.remove(currentSlide);

},
//........Add image.......................................................
addImage : function() { 
    $("#wrapper").show();
 
},
//.........Remove image...................................................
removeImage : function(){ 

alert("remove Image");

},
//.........Add video......................................................
addVideo : function(){ 
    $("#wrapper").show();
},
//.........getUrl.........................................................
getUrl : function(){
    var someText = $('#myTextAreaUrl').val();
    alert(someText);
    $("#wrapper").hide();
},
//.........removeVideo....................................................
removeVideo : function(){alert("remove Video");},
//..........save..........................................................
save: function(){alert("save");},
//...........selectLanguage...............................................
selectLanguage: function(e){alert("Select:"+$(e.currentTarget).val()); }
});

return ToolbarView;
});
