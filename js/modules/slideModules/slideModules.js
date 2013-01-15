define([
'js/modules/slideModules/slides',
'js/modules/slideModules/slide',
'js/libs/pubsub'], 
    function(S,Slide,PubSub) {
    // slideModule is used for making an instance of Slides collection that basicly starts the engine of the application
    /**
    *@class SlideModule The Slide Module used in the application    
    *@constructor
   */
    var SlideModule =function()
    {  
        /**
        *@property
        *@type object
        */ 
        //we create a new Collection so we can add slides to it.
        this.slides= new S(); 
        //the collection subscribes to events on the toolbar
        this.slides.subscribeStatements();

        //function that reads the entry in local storage with the name recieved as a parameter
        var loadFromLocalStorage =function(name) {
            var localStorageItem=localStorage.getItem(name);
            console.log("GET ../slides");
            return localStorageItem;
        };

        //function that loads the correct entry form local storage based on the data it recieves from the toolbar
        var presentationChanger= function(msg,data) {
            var saved;
            var localSlides;
            //first we empty the current collection
            slideModulesObj.slides.reset();
            //read the local storage and see if there's anything in there, equivalent to a GET ../slides REST operation
            saved=loadFromLocalStorage(data);            
            if (typeof saved==='string') {
            //if theres something in the local storage load it in our Collection of slides
            localSlides=JSON.parse(saved);
            slideModulesObj.slides.reset(localSlides);
            }
        };

        PubSub.subscribe("change presentation",presentationChanger);       
        

    };
    return SlideModule;
});