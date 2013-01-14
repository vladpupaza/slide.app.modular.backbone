define([
'js/modules/slideModules/slides',
'js/modules/slideModules/slide',
'js/libs/pubsub'], 
    function (S,Slide,PubSub) {
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
 
        this.slides= new S();
 
        this.slides.subscribeStatements();
        var that=this;
        var loadFromLocalStorage =function(name)
        {
            var localStorageItem=localStorage.getItem(name);
            console.log("GET ../slides");
            return localStorageItem;
        };
        var presentationChanger= function(msg,data)
        {
            that.slides.reset();
            // read the local storage and see if there's anything in there, equivalent to a GET ../slides REST operation
            var saved=loadFromLocalStorage(data);
            if (typeof saved==='string')
        {
            //if theres something in the local storage load it in our Collection of slides
            var localSlides=JSON.parse(saved);
            var l=localSlides.length;
            for(var i=0;i<l;i++)
            {that.slides.add(localSlides[i]);}          
        }

 
        };
        PubSub.subscribe("change presentation",presentationChanger);
        /**
        *@property
        *@type object
        */
        this.a = new Slide({id:'10'});
        this.a.set({id:null});
    };
    return SlideModule;
});