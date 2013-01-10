define(['js/modules/slideModules/slides', 'js/modules/slideModules/slide'], 
	function(s,slide) {
	// slideModule is used for making an instance of Slides collection that basicly starts the engine of the application
	var slideModule =function()
	{		
		// we create a new Collection so we can add slides to it.
		slides= new s();
		// read the local storage and see if there's anything in there, equivalent to a GET ../slides REST operation
		saved=localStorage.getItem("savedSlides");
		console.log("GET ../slides");
		if (typeof saved==='string')
		{
			//if theres something in the local storage load it in our Collection of slides
			localSlides=JSON.parse(saved);
			l=localSlides.length;
			for(var i=0;i<l;i++)
			{slides.add(localSlides[i]);}			
		};
		//instance of a slide model
		a = new slide({id:'10'});
		a.set({id:null});
	};
	
	return slideModule;
});