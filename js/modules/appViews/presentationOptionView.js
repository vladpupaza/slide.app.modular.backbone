define(['jquery','underscore','backbone','js/libs/pubsub','js/modules/appViews/appViewTemplate'],
function ($,_,Backbone,pubSub,templates)
{
	var PresentationOptionView = Backbone.View.extend({
		el:$("#toolbar"),
		events:{
			"click #presentationOption li ": "selectPresentation"
		},
		
		initialize:function() {
			this.render();
		},
		render:function() {
			this.loadNamesFromLocalStorage();
		},
		addPresentation:function(msg,data) {
			$("#presentationOption").append('<li class="options" value='+data+'>'+data+'</li>');
         },
		selectPresentation : function(e) {
                var name=$(e.currentTarget).context.textContent;
                window.currentPresentation=name;
		        console.log(currentPresentation);
        },
        setCurrentPresentation:function(msg,name) {
        	pubSub.publish("change presentation",name);
        },
        loadNamesFromLocalStorage: function() {
        	var names = JSON.parse(localStorage.getItem("presentations"));
        	if(names !== null){
                var count = names.length;
                var i;
                for (i=0;i<count;i++) {
        		this.el.find("#presentationOption").append('<li class="options" value='+names[i]+'>'+names[i]+'</li>');
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
