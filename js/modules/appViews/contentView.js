
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


    //..............At initialize I chose a diferent template base on model's attribute type
    initialize: function () { 
    	if(this.model.toJSON()._type=='Image')this.template=_.template(Template.content_template_image);
		else if(this.model.toJSON()._type=='Text')this.template=_.template(Template.content_template_text);
		else if(this.model.toJSON()._type=='Video')this.template=_.template(Template.content_template_video);
		else console.log('I don;t have a type');
		_.bindAll(this, "render");  
		
         //..... when the change event fires from the modcel , I rerender the view
		this.model.bind('change',this.render); 
		if(window.currentSlide){window.currentSlide.bind('change',this.render)};
        //I prevent rendering if the Id is null , so I cannot render an invalid model
		if(this.model.get('id')!=null){ 
			this.render(); 
		}
 
    },
    render: function () { 
        this.el.html(this.template(this.model.toJSON()));
        //After drawing the element I bind the latter function , who needs the rendered elements , for draggebel image
		this.addListeners();
        return this;
    },
	alertMe:function(){console.log('I"m here');},
 //here I set those to elements to listen  for events like mousedown/mouseup, and then to do those functions
	addListeners:function (){
		document.getElementById('draggebel').addEventListener('mousedown', this.mouseDown, false);
		document.getElementById('slideWorkArea').addEventListener('mouseup', this.mouseUp, false);
		
	},
	
	mouseUp:function ()
	{	 
		document.getElementById('slideWorkArea').removeEventListener('mousemove', divMove, true);
		  if($('#draggebel').css('top')!='auto'){
 
      //I'm passing the event as silent , so I can set the x too without to re-render the view before bothe changes are applyed  
			currentSlide.set({_y:$('#draggebel').css('top')},{silent: true});
			currentSlide.set({_x:$('#draggebel').css('left')}); 
        }

 
	},
	
  //this function is called so I will be able to move the draggebel div , base on event's coordonates
    
  //I allso prevent the chields elements from DOM to capture the event e 
	mouseDown:function (e){
		console.log('action started');
		document.getElementById('slideWorkArea').addEventListener('mousemove', divMove, true);
		e.preventDefault();
	},
	updateText:function(){this.model.setText($('.text')[0].value)},
    //this function is to set the model , and after that to initialize the view again , so I won't use more than one content view in this app
    setModel:function(model){
		 
		this.model=model;
		this.initialize();
	}
 
   
});
return contentView;
});


