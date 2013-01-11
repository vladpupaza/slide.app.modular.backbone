define(['js/modules/slideModules/slides', 'js/modules/slideModules/slide'], 
	function(s,slide) {
	// slideModule is used for making an instance of Slides collection that basicly starts the engine of the application
    /**
    *@class SlideModule The Slide Module used in the application    
    *@constructor
   */
	var SlideModule =function()
	{
		// we create a new Collection so we can add slides to it.
        /**
        *@property
        *@type object
        */
		this.slides= new s();

        this.slides.subscribeStatements();
		// read the local storage and see if there's anything in there, equivalent to a GET ../slides REST operation
		saved=localStorage.getItem("savedSlides");

		console.log("GET ../slides");
		if (typeof saved==='string')
		{
			//if theres something in the local storage load it in our Collection of slides
			var localSlides=JSON.parse(saved);
			var l=localSlides.length;
			for(var i=0;i<l;i++)
			{this.slides.add(localSlides[i]);}			
		};
		//instance of a slide model
        /**
        *@property
        *@type object
        */
		this.a = new slide({id:'10'});
		this.a.set({id:null});
	};
	return SlideModule;
});