define(['jquery','underscore','backbone','js/libs/pubsub','js/modules/appViews/appViewTemplate','bootstraps'],
function ($,_,Backbone,pubSub,appTemplate)
{

	"use strict";
    var modalView = Backbone.View.extend({
    el:$("body"),
    template:_.template(appTemplate.modal_view),
    initialize : function() {
    	this.render();
    },
    render:function() {
    	this.el.append(this.template().toString());
    },
    events: {
    	 "click #saveChanges": "saveChanges"
    },

    saveChanges:function() {
    	$('#saveModal').modal('hide');
        var name= $('#saveModal input').val();
        console.log(name);
    	pubSub.publish("saveChanges",name)
    }

    });
    return modalView;
 });