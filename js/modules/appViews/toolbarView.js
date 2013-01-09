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
var t=new slideCollection;
console.log(t.addSlide());

},
//.......Remove a slide...................................................
removeSlide : function() { alert("remove slide");},
//........Add image.......................................................
addImage : function() { 
    $("#insertImageUrl").show();
 
},
//.........Remove image...................................................
removeImage : function(){ 
alert("remove Image");},
//.........Add video......................................................
addVideo : function(){ 
    $("#insertImageUrl").show();
},
//.........getUrl.........................................................
getUrl : function(){
    var someText = $('#myTextAreaUrl').val();
    alert(someText);
    $("#insertImageUrl").hide();
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
