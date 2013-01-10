define(['jquery', 'underscore', 'backbone','js/modules/appViews/appViewTemplate','js/modules/slideModules/slides', 'js/libs/pubsub'],
function($,_,Backbone,toolbarTemplate,slideCollection,pubSub){
ToolbarView = Backbone.View.extend({
el: $("#toolbar"),
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
    "click #addImageUrlBtn" : "getUrl",
    "click #cancelImageUrlBtn" : "cancelUrl",
    "click #slideshowBtn":"slideshow" 
},
//......Adding a slide....................................................
addSlide : function(){ 
    window.slides.addSlide();

},
//.......Remove a slide...................................................
removeSlide : function() { 
     
  //  var currentSlideId = $(".currentSlide").attr("id");
  //  var currentSlide=slides.at(currentSlideId);
  if (typeof currentSlide !== "undefined") {
    slides.remove(currentSlide);
    console.log('DELETE ../slides/id');
    delete(currentSlide); 
    $('#content').html('');
  }
},
//........Add image.......................................................
addImage : function() { 
    
   // var currentSlideId = $(".currentSlide").attr("id");
   // var currentSlide=slides.at(currentSlideId);
    if (typeof currentSlide !== "undefined") {
      var tip=currentSlide.getType();
      if(tip === "Image")
      $("#wrapper").show();
    }
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
//.........cancelUrl.........................................................
cancelUrl : function(){
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
selectLanguage: function(){ 
//........in selOption we store the current selected value (english/ romanian).....
    var selOption = $("#languageOption").val(); 
//........setEnglishLanguage is a function that receives the data from the JSON....
//........file englishLanguage and then uses this data to set the text of the...... 
//........buttons in english.......................................................
    function setEnglishLanguage(){
        $.getJSON('data/englishLanguage', function(data){   
            var englishLanguageObject = data.englishLanguage;
            $("#addSlideBtn").text(englishLanguageObject.addSlideBtn);
            $("#removeSlideBtn").text(englishLanguageObject.removeSlideBtn);
            $("#addImageToSlideBtn").text(englishLanguageObject.addImageToSlideBtn);
            $("#removeImageFromSlideBtn").text(englishLanguageObject.removeImageFromSlideBtn);
            $("#addVideoBtn").text(englishLanguageObject.addVideoBtn);
            $("#removeVideoBtn").text(englishLanguageObject.removeVideoBtn);
            $("#slideshowBtn").text(englishLanguageObject.slideshowBtn);
            $("#saveBtn").text(englishLanguageObject.saveBtn);
            $('#addImageUrlBtn').text(englishLanguageObject.addImageUrlBtn);
            $('#cancelImageUrlBtn').text(englishLanguageObject.cancelImageUrlBtn);
            });
    }
//........setEnglishLanguage is a function that receives the data from the JSON....
//........file romanianLanguage and then uses this data to set the text of the..... 
//........buttons in romanian......................................................    
    function setRomanianLanguage(){
         $.getJSON('data/romanianLanguage', function(data){
            var englishLanguageObject = data.romanianLanguage;
            $("#addSlideBtn").text(englishLanguageObject.addSlideBtn);
            $("#removeSlideBtn").text(englishLanguageObject.removeSlideBtn);
            $("#addImageToSlideBtn").text(englishLanguageObject.addImageToSlideBtn);
            $("#removeImageFromSlideBtn").text(englishLanguageObject.removeImageFromSlideBtn);
            $("#addVideoBtn").text(englishLanguageObject.addVideoBtn);
            $("#removeVideoBtn").text(englishLanguageObject.removeVideoBtn);
            $("#slideshowBtn").text(englishLanguageObject.slideshowBtn);
            $("#saveBtn").text(englishLanguageObject.saveBtn);
            $('#addImageUrlBtn').text(englishLanguageObject.addImageUrlBtn);
            $('#cancelImageUrlBtn').text(englishLanguageObject.cancelImageUrlBtn);
        });
    };
//........here we verify the selOption to know what function we need to use.........
    if(selOption === "english"){ setEnglishLanguage();  $('#languageOption').change(setEnglishLanguage); } 
    else { setRomanianLanguage(); $('#languageOption').change(setRomanianLanguage);}
},
slideshow:function(){

    var i=0;  
    var nr=slides.length;  
    if (nr===0)
      alert("No slides to be shown")
    else
    {     
          $("#slideshowMode").css('visibility','visible');
          var timer=setInterval(function(){
        
          sidebarViewObj.setCurrentSlide(slides.at(i),i);
         
          if (i===nr-1)
          {
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