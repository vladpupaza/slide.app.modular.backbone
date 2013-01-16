define(['underscore', 'backbone','js/modules/slideModules/slide','localStorage','js/libs/pubsub'], 
function(_, Backbone,slide,_localStorage,pubSub) {
/**
* @cfg Slides extends Backbone.Collection
*/ 
    var Slides = Backbone.Collection.extend ({
        /**
        * @property
        * @type slide
        */
        model : slide,
        
        localStorage : new Store('cosmin_Slides'),
		
		/**
		 * @method
		 * overwriten the method remove , to remove the object from server to
		 */
        remove : function(_model) {
			this.get(_model.get('id')).destroy();
		},
        subscribeStatements : function() {
            pubSub.subscribe('addNewSlide', this.addSlide); 
            pubSub.subscribe('removeCurrentSlide', this.removeSlide);  
            pubSub.subscribe('addImageToSlide', this.addImageToCurrentSlide);
            pubSub.subscribe('removeImageFromSlide', this.removeImageFromCurrentSlide);
            pubSub.subscribe('addVideoToSlide', this.addVideoToCurrentSlide);
            pubSub.subscribe('removeVideoFromSlide', this.removeVideoFromCurrentSlide);     
            pubSub.subscribe('getUrl', this.getUrlSubscriber);
        },
		/**
		 * @method
		 */
        updateAll : function() {
            var _temp=this.localStorage.findAll();
            var i;
			// delete from local storage all the objects that are not in collection
			for (i=0; i<_temp.length; i++) {
				if(!this.get(_temp[i].id)){
					this.localStorage.destroy(_temp[i]);
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
            var sl = new slide();
            sl.set({"_type":typeViewObj.getCurrentType()});
            slideModulesObj.slides.add(sl);
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
