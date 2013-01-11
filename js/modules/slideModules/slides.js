define(['underscore', 'backbone','js/modules/slideModules/slide','localStorage','js/libs/pubsub'], function(_, Backbone,slide,_localStorage,pubSub) {
 var Slides = Backbone.Collection.extend({
   

  model:slide,
  //local storage usingBlackbone localstorage
  localStorage:new Store('cosmin_Slides'),
  localSlides: JSON.parse(localStorage.getItem("savedSlides")),
  remove:function(_model){
			this.get(_model.get('id')).destroy();
		},
 updateAll: function() {
			var _temp=this.localStorage.findAll();
			
			//delete from local storage all the objects that are not in collection
			for (var i=0;i<_temp.length;i++){
				if(!this.get(_temp[i].id)){
					this.localStorage.destroy(_temp[i]);
				}
			} 
			//now I add or update existant objects from collection
			for (var i=0; i<this.length;i++){
				this.at(i).save();
			}	
		},
  // add slide function
  //here we simulate a singleton: we have one single instance of slides collection and we add slides only on it, even if we call addSlide function from another instance of slides collection

  addSlide: function(){
   var sl = new slide();
   sl.setType(typeViewObj.getCurrentType());
   slideModulesObj.slides.add(sl);
   
   console.log("POST ../slides");
  },
  
  removeSlide: function(){
   if (typeof currentSlide !== "undefined") {
    slideModulesObj.slides.remove(currentSlide);
    console.log('DELETE ../slides/id');
    delete(currentSlide); 
    $('#content').html('');
    idCurrent = -1;
   }
  },
  
  addImageToCurrentSlide:function(){
   if (typeof currentSlide !== "undefined") {
    if(currentSlide.getType() === "Image")
    $("#wrapper").show();
   }
  },
  removeImageFromCurrentSlide:function(){
   if ((typeof currentSlide !== "undefined")&&(currentSlide.getType()==="Image")) {
    currentSlide.setUrl("");
   }
  },
  addVideoToCurrentSlide:function(){
   if (typeof currentSlide !== "undefined") {
    var tip=currentSlide.getType();
    if(tip === "Video") $("#wrapper").show();
   }
  },
  removeVideoFromCurrentSlide:function(){
   if ((typeof currentSlide !== "undefined")&&(currentSlide.getType()==="Video")) {
    currentSlide.setUrl("");
   }
  }
 });
 return Slides;


});
