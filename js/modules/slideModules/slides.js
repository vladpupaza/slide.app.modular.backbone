define(['underscore', 'backbone','js/modules/slideModules/slide','localStorage','js/libs/pubsub'], function(_, Backbone,slide,_localStorage,pubSub) {
 var Slides = Backbone.Collection.extend({
        initialize : function(){
          pubSub.subscribe('addNewSlide', slideModulesObj.slides.addSlide); 
         // pubSub.subscribe('removeCurrentSlide', removeSlide);  
       //   pubSub.subscribe('addImageSlide', addImageToCurrentSlide);
          
        },
  model:slide,
  //local storage usingBlackbone localstorage
  localStorage:new Store('cosmin_Slides'),
  
  updateAll: function() {
   for(var i=0;i<this.length;i++){
    this.localStorage.update(this.at(i));
   }
  },
  // add slide function
  //here we simulate a singleton: we have one single instance of slides collection and we add slides only on it, even if we call addSlide function from another instance of slides collection
  addSlide: function(){
   var sl = new slide();
   sl.setType(typeViewObj.getCurrentType());
   slideModulesObj.slides.add(sl);
   sl.save();
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
