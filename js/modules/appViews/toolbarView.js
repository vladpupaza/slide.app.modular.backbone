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
   
},
//..........save..........................................................
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
//...........selectLanguage...............................................
selectLanguage: function(e){alert("Select:"+$(e.currentTarget).val()); }
});

return ToolbarView;
});