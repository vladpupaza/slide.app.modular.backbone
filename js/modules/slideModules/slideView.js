define(['underscore', 'backbone'], function(_, Backbone) {
var slideView = Backbone.View.extend({
	
    initialize: function () { 
       
         this.render();
    },
    render: function () {
		
        console.log(this.model);//this should render this.model;
        },
	});
return slideView;
});