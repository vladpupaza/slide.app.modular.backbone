/*global define:false*/
define([
'js/modules/slideModules/slides',
'js/libs/pubsub',
'js/modules/slideModules/slide'], 
function(S,PubSub,slide) {
"use strict";
    // slideModule is used for making an instance of Slides collection that basicly starts the engine of the application
    /**
    *@class SlideModule The Slide Module used in the application    
    *@constructor
    */
    var SlideModule =function()
    {
        /*global slideModulesObj:false*/
        /*global console:false*/
        /**
        *@property
        *@type object
        */ 
        //we create a new Collection so we can add slides to it.
        this.slides= new S(); 
        this.slides.model=slide;
        //the collection subscribes to events on the toolbar
        this.slides.subscribeStatements();
        //function that reads the entry in local storage with the name recieved as a parameter
        var loadFromLocalStorage =function(name) {
            var localStorageItem=localStorage.getItem(name);
            console.log("GET ../slides");
            return localStorageItem;
        };
        //function that replaces the current collection of slides with the one loaded from localStorage
        var replaceSlides = function(slides){
            //if theres something in the local storage load it in our Collection of slides      
            var localSlides=JSON.parse(slides);
            Application.slideModulesObj.slides.reset(localSlides);
           // PubSub.publish("change presentation reset collection","");
        };
        //function that loads the correct entry form local storage based on the data it recieves from the toolbar
        var presentationChanger= function(msg,data) {
            //first we empty the current collection
            Application.slideModulesObj.slides.reset();
            //read the local storage and see if there's anything in there, equivalent to a GET ../slides REST operation
            var saved=loadFromLocalStorage(data);            
            if (typeof saved==='string') {
            replaceSlides(saved);               
            //if theres something in the local storage load it in our Collection of slides
            PubSub.publish("change presentation reset collection","");
            }
        };
        PubSub.subscribe("change presentation",presentationChanger);
    };
    return SlideModule;
});