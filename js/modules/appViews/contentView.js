
define(['underscore', 'backbone','js/modules/slideModules/slide','js/modules/appViews/appViewTemplate'], function(_, Backbone,defaultS,Template) {
console.log(Template.content_template);
 

var contentView = Backbone.View.extend({
	el:$('#content'),
    tagName: "div", 
    template: _.template(Template.content_template),
    events: {
         //this event will be attached to the model elements in
         //the el of every view inserted by AppView below
        "click": "alertMe",
		"updateReady":'updateText',
		"txtnbleft":'ceva',
    },
	
	ceva:function(){
	//console.log ();
	$("#txtnb").html("Characters left: "+(250-$('.text')[0].value.length));
	},
    initialize: function () { 
    	if(this.model.toJSON()._type=='Image')this.template=_.template(Template.content_template_image);
		else if(this.model.toJSON()._type=='Text')this.template=_.template(Template.content_template_text);
		else if(this.model.toJSON()._type=='Video')this.template=_.template(Template.content_template_video);
		else console.log('I don;t have a type');
		_.bindAll(this, "render");  
		
		this.model.bind('change',this.render); 
		if(window.currentSlide){window.currentSlide.bind('change',this.render)};
		if(this.model.get('id')!=null){ 
			this.render(); 
		}
 
    },
    render: function () { 
        this.el.html(this.template(this.model.toJSON()));
		this.addListeners();
        return this;
    },
	alertMe:function(){console.log('I"m here');},
 
	addListeners:function (){
		document.getElementById('draggebel').addEventListener('mousedown', this.mouseDown, false);
		document.getElementById('slideWorkArea').addEventListener('mouseup', this.mouseUp, false);
		
	},
	
	mouseUp:function ()
	{	 
		document.getElementById('slideWorkArea').removeEventListener('mousemove', divMove, true);
		setTimeout(function(){
			currentSlide.set({_y:$('#draggebel').css('top')},{silent: true});
			currentSlide.set({_x:$('#draggebel').css('left')}); },200);

 
	},
	
	mouseDown:function (e){
		console.log('action started');
		document.getElementById('slideWorkArea').addEventListener('mousemove', divMove, true);
		e.preventDefault();
	},
	updateText:function(){this.model.setText($('.text')[0].value)},
    setModel:function(model){
		 
		this.model=model;
		this.initialize();
	}
 
   
});
return contentView;
});


