define(['js/modules/slideModules/slides', 'js/modules/slideModules/slide'], function(s,slide) {
	var slideModule =function(){
		
		slides= new s();

		saved=localStorage.getItem("savedSlides")
		 if (typeof saved==='string')
		 	{

		 			localSlides=JSON.parse(saved)		 			
		 			l=localSlides.length
		 			for(var i=0;i<l;i++)
		 			slides.add(localSlides[i])
		 			//theres something in the local storage

		 	}
		
		a = new slide({id:'10'});
		a.set({id:null});
        }
	
	return slideModule;
});