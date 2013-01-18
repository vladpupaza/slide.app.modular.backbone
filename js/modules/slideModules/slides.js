/*global define:false*/
define([
'underscore',
'backbone',
'localStorage',
'js/libs/pubsub'
], 
function(_, Backbone,_localStorage,pubSub) {
    "use strict";
    /*global console:false*/
    /*global slideModulesObj:false*/
    /*global typeViewObj:false*/
    /*global idCurrent:false*/
    /*global currentSlide:false*/
    /*global $:false*/
    
//private fuction that binds the function subscribers with the apropriate messages
//it is used in subscribe statements 
    var bindSubscribers = function(message,fun){
            for(var i=0;i<=message.length;i++){
                pubSub.subscribe(message[i],fun[i]); 
            }
        };
        
    /**
    * @cfg Slides extends Backbone.Collection
    */ 
    var Slides = Backbone.Collection.extend ({

        subscribeStatements : function() {
          /**
		 * @method
         * binds the functions with the messages for pubsub.subscribe
		 */
            bindSubscribers(["addNewSlide","removeCurrentSlide","addImageToSlide","removeImageFromSlide","addVideoToSlide","removeVideoFromSlide","getUrl"],
            [this.addSlide,this.removeSlide,this.addImageToCurrentSlide,this.removeImageFromCurrentSlide,this.addVideoToCurrentSlide,this.removeVideoFromCurrentSlide,this.getUrlSubscriber]);
        },
        
        addSlide : function() {
        /**
        *@method   
        *@add slide function   
        *@here we simulate a singleton: we have one single instance of slides collection
        *@and we add slides only on it, even if we call addSlide function from another 
        *@instance of slides collection        
        */
            slideModulesObj.slides.add({"_type":typeViewObj.getCurrentType()});
            console.log("POST ../slides");
			window.idCurrent=slideModulesObj.slides.length-1;
        },
        
		removeSlide : function() {
        /**
        *@method   
        *@remove slide function          
        */
            if ( idCurrent !== -1 ) {
                slideModulesObj.slides.remove(currentSlide);
                console.log('DELETE ../slides/id');
            }
        },
        
        addImageToCurrentSlide : function() {
        /**
        *@method   
        *@add image to currentSlide function          
        */
            if (typeof currentSlide !== "undefined") {
                if(currentSlide.get("_type") === "Image"){
                    $("#wrapper").show();
                }    
            }
        },
        
        removeImageFromCurrentSlide : function() {
        /**
        *@method   
        *@remove image from current slide function          
        */
            if ((typeof currentSlide !== "undefined") && (currentSlide.get("_url")!==null) && (currentSlide.get("_type") === "Image")) {
                currentSlide.set({_url:""});
            }
        },
        
        addVideoToCurrentSlide : function() {
        /**
        *@method   
        *@add video to currentSlide function          
        */
            if (typeof currentSlide !== "undefined") {
                var tip = currentSlide.get("_type");
                if(tip === "Video") {
                    $("#wrapper").show();
                }    
            }
        },
        
        removeVideoFromCurrentSlide : function() {
        /**
        *@method   
        *@remove video to currentSlide function          
        */
            if ((typeof currentSlide !== "undefined") && (currentSlide.get("_url")!==null) && (currentSlide.get("_type") === "Video")) {
                currentSlide.set({_url:""});
            }
        },
        
        getUrlSubscriber : function(topic,data) {
        /**
        *@method   
        *@gets the URL for image or video slides         
        */
            console.log(topic+":"+data);
            currentSlide.set({_url:data});
            $("#"+idCurrent).addClass("currentSlide"); 
        }
        
    });
    return Slides;
});
