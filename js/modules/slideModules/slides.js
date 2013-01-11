define(['underscore', 'backbone','js/modules/slideModules/slide','localStorage','js/libs/pubsub'], function(_, Backbone,slide,_localStorage,pubSub) {

/**
* @cfg Slides extends Backbone.Collection
*/ 
    var Slides = Backbone.Collection.extend({
         /**
        * @property
        * @type slide
        */
        model : slide,
        
        localStorage : new Store('cosmin_Slides'),
        remove : function(_model){
			this.get(_model.get('id')).destroy();
		},
        subscribeStatements: function(){
            pubSub.subscribe('addNewSlide', this.addSlide); 
            pubSub.subscribe('removeCurrentSlide', this.removeSlide);  
            pubSub.subscribe('addImageToSlide', this.addImageToCurrentSlide);
            pubSub.subscribe('removeImageFromSlide', this.removeImageFromCurrentSlide);
            pubSub.subscribe('addVideoToSlide', this.addVideoToCurrentSlide);
            pubSub.subscribe('removeVideoFromSlide', this.removeVideoFromCurrentSlide);     
            pubSub.subscribe('getUrl', this.getUrlSubscriber);
        },
        updateAll : function(){
            var _temp=this.localStorage.findAll();
			/**
            * delete from local storage all the objects that are not in collection
			*/
            for (var i=0;i<_temp.length;i++){
				if(!this.get(_temp[i].id)){
					this.localStorage.destroy(_temp[i]);
				}
			} 
            /**
            * now I add or update existant objects from collection
			*/
            for (var i=0; i<this.length;i++){
				this.at(i).save();
			}	
        },
        addSlide : function(){
        /**
        * @method   
        *add slide function   
        *here we simulate a singleton: we have one single instance of slides collection
        *and we add slides only on it, even if we call addSlide function from another 
        *instance of slides collection        
        */
            var sl = new slide();
            sl.setType(typeViewObj.getCurrentType());
            slideModulesObj.slides.add(sl);
            console.log("POST ../slides");
        },
        removeSlide : function(){
         /**
        * @method   
        *remove slide function          
        */
            if (typeof currentSlide !== "undefined"){
                slideModulesObj.slides.remove(currentSlide);
                console.log('DELETE ../slides/id');
                delete(currentSlide); 
                $('#content').html('');
                idCurrent = -1;
            }
     
        },
        addImageToCurrentSlide : function(){
        /**
        * @method   
        * add image to currentSlide function          
        */
            if (typeof currentSlide !== "undefined"){
                if(currentSlide.getType() === "Image")
                    $("#wrapper").show();
            }
        },
        removeImageFromCurrentSlide : function(){
        /**
        * @method   
        *remove image from current slide function          
        */
            if ((typeof currentSlide !== "undefined")&&(currentSlide.getType() === "Image")){
                currentSlide.setUrl("");
            }
        },
        addVideoToCurrentSlide : function(){
        /**
        * @method   
        * add video to currentSlide function          
        */
            if (typeof currentSlide !== "undefined"){
                var tip = currentSlide.getType();
                if(tip === "Video") $("#wrapper").show();
            }
        },
        removeVideoFromCurrentSlide : function(){
        /**
        * @method   
        * remove video to currentSlide function          
        */
            if ((typeof currentSlide !== "undefined")&&(currentSlide.getType() === "Video")){
                currentSlide.setUrl("");
            }
        },
        getUrlSubscriber : function(topic,data){
        /**
        * @method   
        * gets the URL for image or video slides         
        */
          console.log(topic+":"+data);
          currentSlide.setUrl(data);
        }
    });
    return Slides;

});
