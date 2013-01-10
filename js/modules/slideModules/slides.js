define(['underscore', 'backbone','js/modules/slideModules/slide','localStorage','js/libs/pubsub'], function(_, Backbone,slide,_localStorage,pubSub) {
	var z=_localStorage;
	var Slides = Backbone.Collection.extend({
        initialize : function(){
         var t = new slide;
		 // we bind the event on slide (subscribe), here,  only once in all application
         var token= pubSub.subscribe('getUrl', t.subscriber); 
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
			var that=this;
			require(['js/modules/slideModules/slide','js/modules/appViews/contentView'], function(slide,contentView){
			var sl = new slide;
			sl.setType(typeViewObj.getCurrentType());
			slides.add(sl);
			sl.save();
			console.log("POST ../slides");

 
			});
		}
	});
	return Slides;
});