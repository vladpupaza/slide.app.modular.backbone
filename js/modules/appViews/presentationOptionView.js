define(['jquery','underscore','backbone','js/libs/pubsub','js/modules/appViews/appViewTemplate'],
function ($,_,Backbone,pubSub,templates)
{
	var PresentationOptionView = Backbone.View.extend({
		el:$("#toolbar"),
		events:{
			"change #presentationOption ": "selectPresentation"
		},
		
		initialize:function() {
			this.render();
		},
		render:function() {
			this.loadNamesFromLocalStorage();
		},
		addPresentation:function(msg,data) {
			$("#presentationOption").append('<option class="options" value='+data+'>'+data+'</option');
			$("#presentationOption").val(data).attr("selected",true);
			window.presentationOptionViewObj.render();
		},
		selectPresentation : function() {
        	if (this.el.find("#presentationOption").val() !== 'Select Presentation') {
		    	pubSub.publish("change presentation",this.el.find("#presentationOption").val());
		    }
        },
        setCurrentPresentation:function(msg,name) {
        	pubSub.publish("change presentation",name);
        },
        loadNamesFromLocalStorage: function() {
        	var names = JSON.parse(localStorage.getItem("presentations"));
        	var count=names.length;
        	var i;
        	for (i=0;i<count;i++) {
        		this.el.find("#presentationOption").append('<option class="options" value='+names[i]+'>'+names[i]+'</option');
        	}
        },

        subscribeStatements:function(){
        	pubSub.subscribe("presentationAdded",this.addPresentation);
        	pubSub.subscribe("setCurrentPresentation",this.setCurrentPresentation); 
        }

    });
	return PresentationOptionView;
});

/***** Changes in other files to make this work:

toolbarView:
	delete: line 115 "change #presentationOption ": "selectPresentation",
			line 394 selectPresentation method
			line 24->33 in render function
	replace line 304 ,315:  //this.render(); 
                			/this.el.find('#presentationOption').val(name).attr("selected",true);
                		with :
                			pubSub.publish("presentationAdded",name);
     add to 295 (if user want to replace): pubSub.publish("setCurrentPresentation",name);
appModule:
 	add : 
 		line 33 : presentationOptionViewObj = new presentationOptionView();*/