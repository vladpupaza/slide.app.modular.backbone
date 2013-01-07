define(['jquery', 'underscore', 'backbone','js/modules/appViews/appViewTemplate'],
function($,_,Backbone,toolbarTemplate){
console.log(toolbarTemplate);
ToolbarView = Backbone.View.extend({

initialize: function(){
            this.render();
          },
template:_.template(toolbarTemplate.toolbar_buttons) ,         
render: function(){
           console.log(this.template());
           console.log(this.model.toJSON());
           console.log(this.template(this.model.toJSON()));            
           this.$el.html( this.template(this.model.toJSON()));
           
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
addSlide : function(){ alert("add slide");},
removeSlide : function() { alert("remove slide");},
addImage : function() { alert("add image");},
removeImage : function(){ alert("remove Image");},
addVideo : function(){ alert(" add Video");},
removeVideo : function(){alert("remove Video");},
save: function(){alert("save");},
selectLanguage: function(e){alert("Select:"+$(e.currentTarget).val()); }
});
return ToolbarView;
});
