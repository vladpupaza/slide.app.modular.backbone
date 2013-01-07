
define(['underscore', 'backbone','js/modules/appViews/appViewTemplate'], function(_, Backbone,Template) {
console.log(Template.textSlide);
var contentView = Backbone.View.extend({
	el:$('#content'),
    tagName: "div", 
    template: _.template(Template.content_template),
	
    events: {
         //this event will be attached to the model elements in
         //the el of every view inserted by AppView below
        "click": "alertMe"
    },
	
	
    initialize: function () { 
        _.bindAll(this, "render"); 
        this.render();
    },
    render: function () {
		
        this.el.html(this.template(this.model.toJSON()));
        return this;
    },
	alertMe:function(){alert('I"m here');}
});
return contentView;
});