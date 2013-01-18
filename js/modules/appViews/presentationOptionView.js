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
			$("#presentationOption").append('<option class="options" value='+data+'>'+data+'</option>');
			$("#presentationOption").val(data).attr("selected",true);
         },
		selectPresentation : function() {
        	if (this.el.find("#presentationOption").val() !== 'Select Presentation') {
		    	pubSub.publish("change presentation",this.el.find("#presentationOption").val());
		    }
        },
        setCurrentPresentation:function(msg,name) {
        	pubSub.publish("change presentation",name);
            $("#presentationOption").val(name).attr("selected",true);
        },
        loadNamesFromLocalStorage: function() {
        	var names = JSON.parse(localStorage.getItem("presentations"));
        	if(names !== null){
                var count = names.length;
                var i;
                for (i=0;i<count;i++) {
        		this.el.find("#presentationOption").append('<option class="options" value='+names[i]+'>'+names[i]+'</option>');
                }
            }
        },
        
    subscribeStatements:function(){
        pubSub.subscribe("presentationAdded",this.addPresentation),
        pubSub.subscribe("setCurrentPresentation",this.setCurrentPresentation);
    }
    });
    
	return PresentationOptionView;
});
