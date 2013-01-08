
define(['underscore', 'backbone','js/modules/appViews/appViewTemplate'], function(_, Backbone,Template) {
console.log(Template.content_template);
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
		if(this.model.toJSON()._type=='Image')this.template=_.template(Template.content_template_image);
		else if(this.model.toJSON()._type=='Text')this.template=_.template(Template.content_template_text);
		else if(this.model.toJSON()._type=='Video')this.template=_.template(Template.content_template_video);
		else console.log('I don;t have a type');
		
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