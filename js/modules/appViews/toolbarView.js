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
    "change #languageOption ": "selectLanguage"        
},
addSlide : function(){ 
var t=new slideCollection;
console.log(t.addSlide());

},
removeSlide : function() { alert("remove slide");},
addImage : function() { 
try{
    //$("#insertImageUrl").show();
    var someText = $('#myTextAreaUrl').val();
    alert(someText);
    //$("#insertImageUrl").hide();
}catch(e)
{
 alert(e);
}
},
removeImage : function(){ 
alert("remove Image");},
addVideo : function(){ 
try{
    //$("#insertImageUrl").show();
    var someText = $('#myTextAreaUrl').val();
    alert(someText);
    console.log( $('#insertImageUrl'));
    //$("#insertImageUrl").hide();
}catch(e){
    alert(e);
}
},
removeVideo : function(){alert("remove Video");},
save: function(){alert("save");},
selectLanguage: function(e){alert("Select:"+$(e.currentTarget).val()); }
});
return ToolbarView;
});
