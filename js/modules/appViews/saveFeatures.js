/*global define:false*/
define(['jquery','underscore','backbone','js/libs/pubsub','js/modules/appViews/toolbarView'],function($,_,Backbone,pubSub,toolbar) {
"use strict";
/*global confirm:false*/
/*global prompt:false*/
var saveFeatures = toolbar.extend({
    events: function() {
        return _.extend({},toolbar.prototype.events,{
         /**
    * @event click
    * Fires when saveBtn is clicked
    * @param {Button} this
    * @param {EventObject} e save        
    */    
        "click #saveBtn" : "save",
    /**
    * @event click
    * Fires when saveasBtn is clicked
    * @param {Button} this
    * @param {EventObject} e save        
    */    
        "click #saveAsBtn" : "saveAs"
        });
    },
         /**
    *@method 
    * sets text to notfification bar and makes it visible
    */  
    sendSaveNotification: function(message) {
       
        $("#notifBar").html(message);
                    $("#notifBar").css("visibility","visible");
                    setTimeout(function hide() {
                    $("#notifBar").css("visibility","hidden");
                    },4000);          
    },
    /**
    * @method    
    *
    */ 
    addZero : function(num) {
                    return (num >= 0 && num < 10) ? "0" + num : num + "";
    },
    /**
    * @method    
    *
    */                
    save : function() {
        localStorage.setItem(window.Application.currentPresentation,JSON.stringify(window.Application.slideModulesObj.slides));
        this.saveMessage(window.Application.currentPresentation);     
       
    },
    /**
    * @method    
    *
    */ 
    saveMessage: function(name){
        var currentDate = new Date();
        var saveString = name+" was saved at "+this.addZero(currentDate.getHours())+":"+
            this.addZero(currentDate.getMinutes())+" "+"( "+this.addZero(currentDate.getDate())+"/"+
            this.addZero(currentDate.getMonth()+1)+"/"+currentDate.getFullYear()+" )";
        this.sendSaveNotification(saveString);
    },
    /**
    * @method    
    *
    */ 
    unicPresentation: function(presentations,l,name){
        for (var i=0; i<l; i++) {
            if (presentations[i] === name) {
                return true;
            }
        }    
        return false;         
    },
    /**
    * @method    
    *
    */ 
    confirmRename: function(name,presentations) {
        if (confirm("Are you sure you want to replace this presentation?")) {
            localStorage.setItem('presentations',JSON.stringify(presentations));
            localStorage.setItem(name,JSON.stringify(window.Application.slideModulesObj.slides));
            pubSub.publish("setCurrentPresentation",name);
        } else {
            this.saveAs();
        }
    },
    /**
    * @method    
    *
    */ 
    addNewPresentation: function(presentations,name) {
        presentations.push(name);
        localStorage.setItem('presentations',JSON.stringify(presentations));
        localStorage.setItem(name,JSON.stringify(window.Application.slideModulesObj.slides));
        pubSub.publish("presentationAdded",name);
    },
    /**
    * @method    
    *
    */ 
    firstPresentation: function(name) {
        var firstPresentation = [name];
        localStorage.setItem('presentations',JSON.stringify(firstPresentation));
        localStorage.setItem(name,JSON.stringify(window.Application.slideModulesObj.slides));
        pubSub.publish("presentationAdded",name);
    },
    /**
    * @method    
    *
    */ 
    checkingPresentations: function(name){
        // checks if there is something in local storage
        var presentations = JSON.parse(localStorage.getItem("presentations"));
        if (this.unicPresentation(presentations,presentations.length,name)) {
        //if there is a presentation with the same name alrerady saved,
        //asks for confirmation to replace it
            this.confirmRename(name,presentations);
        } else {
            this.addNewPresentation(presentations,name);
            return true;
        }
    },
    /**
    * @method    
    *
    */ 
    savePresentation: function(name){
        if (name) {
            if (localStorage.getItem("presentations")) {
                return this.checkingPresentations(name);

            } else {   
                //if local storage is empty creates an array with presentation names 
                //and adds the current presentation to local storage
                this.firstPresentation(name);
                return true;
            }
        }
        return false;
    },
    /**
    * @method    
    *
    */ 
    saveAs: function(){
    var name = prompt("Give the name for the presentation","untitled");
        if (this.savePresentation(name)) {
            //shows a notification bar if the presentation is saved
            this.saveMessage(name);
        }
    }

});
return saveFeatures;
});