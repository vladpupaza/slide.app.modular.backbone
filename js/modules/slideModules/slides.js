define(['underscore', 'backbone','localStorage','js/libs/pubsub'], 
function(_, Backbone,_localStorage,pubSub) {

//private fuction that binds the function subscribers with the apropriate messages
//it is used in subscribe statements 
 var bindSubscribers = function(message,fun){
            for(var i=0;i<=message.length;i++){
                pubSub.subscribe(message[i],fun[i]); 
            }
        }
        
    /**
    * @cfg Slides extends Backbone.Collection
    */ 
    var Slides = Backbone.Collection.extend ({
        
        localStorage : new Store('cosmin_Slides'),
		
		/**
		 * @method
		 * overwriten the method remove , to remove the object from server too
		 */
        remove : function(model) {
			this.get(model.get('id')).destroy();
		},
        
        /**
		 * @method
         * binds the functions with the messages for pubsub.subscribe
		 */
        subscribeStatements : function() {
            bindSubscribers(["addNewSlide","removeCurrentSlide","addImageToSlide","removeImageFromSlide","addVideoToSlide","removeVideoFromSlide","getUrl"],
            [this.addSlide,this.removeSlide,this.addImageToCurrentSlide,this.removeImageFromCurrentSlide,this.addVideoToCurrentSlide,this.removeVideoFromCurrentSlide,this.getUrlSubscriber]);
        },
        
		/**
		 * @method
		 */
        updateAll : function() {
			// delete from local storage all the objects that are not in collection
			for (var i=0,temp=this.localStorage.findAll().length; i<temp; i++) {
				if(!this.get(temp[i].id)){
					this.localStorage.destroy(temp[i]);
				}
			} 
            // now I add or update existant objects from collection
            for (i=0; i<this.length; i++) {
				this.at(i).save();
			}	
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
			idCurrent=slideModulesObj.slides.length-1;
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
            if ((typeof currentSlide !== "undefined") && (currentSlide.get("_type") === "Image")) {
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
            if ((typeof currentSlide !== "undefined") && (currentSlide.get("_type") === "Video")) {
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
