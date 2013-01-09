define(['js/modules/slideModules/slides'], function(s) {
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
		

          
        }
	
	return slideModule;
});