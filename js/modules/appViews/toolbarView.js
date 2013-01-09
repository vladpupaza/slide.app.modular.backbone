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
save: function(){


    var currentDate=new Date();
    localStorage.setItem("savedSlides",JSON.stringify(slides));//save collection to localStorage
    
    //************* Singleton to create a notification*******/
    var notification=(function()
    {
      var instance;

        function init()
        {

          //private methods
            function notify(message)
            {
              console.log(message);
            }
      
      
          return {
            //public methods
            sendSaveNotification:function(message)//sets text to notfification bar and makes it visible
            {
              $("#notifBar").html(message);
              $("#notifBar").css("visibility","visible");
              setTimeout(function hide()
                      {
                        $("#notifBar").css("visibility","hidden");
                      }
                  ,4000);
             
              },

               AddZero:function(num)
                {
                return (num >= 0 && num < 10) ? "0" + num : num + "";
                }
      
          }
        }

          return {
            getInstance:function()
            {
        
                if ( !instance )
                {
                  instance = init();
                }

              return instance;
            }   

    } 
    })();
     
    //get instance of singleton notification and throw notification
    var n=notification.getInstance();
    var saveString="Saved at "+n.AddZero(currentDate.getHours())+":"+n.AddZero(currentDate.getMinutes())+" "+"( "+n.AddZero(currentDate.getDate())+"/"+n.AddZero(currentDate.getMonth()+1)+"/"+currentDate.getFullYear()+" )";
    n.sendSaveNotification(saveString);

},
selectLanguage: function(e){alert("Select:"+$(e.currentTarget).val()); }
});
return ToolbarView;
});
