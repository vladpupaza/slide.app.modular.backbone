 
/* @class ContentView , the class of content view 	
 * @extends Backbone.View
 * @param  as param recives the model of the curent slide
	 */
var ContentView = Backbone.View.extend({ 


    tagName: "div", 
	id:'contentView',
    template: _.template(appViewTemplate.content_template),
	
	
	/*@event  updateReady, fired from DOM , when the textarea lose focus
	 *@event txtnbleft , fired when user start's to type in text area	*/
    events: {
         //this event will be attached to the model elements in
         //the el of every view inserted by AppView below
        //"click": "alertMe",
		"updateReady":'updateText',
		"txtnbleft":'ceva'
    },
	
	ceva:function(){ 
	$("#txtnb").html("Characters left: "+(250-$('.text')[0].value.length));
	},

 
	/*
	 * @initialize , at initialize , I give the view's template based on the model's type*/
    initialize: function () {
		if(this.model.toJSON()._type==='Image'){
			this.template=_.template(appViewTemplate.content_template_image);
			}
		else if(this.model.toJSON()._type==='Text'){
			this.template=_.template(appViewTemplate.content_template_text);
			}
		else if(this.model.toJSON()._type==='Video'){
			this.template=_.template(appViewTemplate.content_template_video);
			}
		_.bindAll(this, "render");  
		
        /* binding I binde the change event of the model , to method rander of the object */
		this.model.bind('change',this.render);  
        /* I prevent rendering if the Id is null , so I cannot render an invalid model */
		if(this.model.get('id')!==null){ 
			this.render(); 
		}
 
    },
	/*
	*@method
	*/
    render: function () { 
	
		/* render it will place the view on DOM , and call the addListener functuin , witch needs that those elements to be painted */
		$(this.el).html(this.template(this.model.toJSON()));
		
		/* After drawing the element I bind the latter function , who needs the rendered elements , for draggebel image */
		$('#content').html(this.el);

/* 		this.addListeners(); */
        return this;
    },
 
	/*
	* 	@method */
	addListeners:function (){
		//	addListeners : here I set those to elements to listen  for events like mousedown/mouseup, and then to do those functions */
		document.getElementById('draggebel').addEventListener('mousedown', this.mouseDown, false);
		document.getElementById('slideWorkArea').addEventListener('mouseup', this.mouseUp, false);
		
	},
/*
 *  @method */
	mouseUp:function ()
	{
		document.getElementById('slideWorkArea').removeEventListener('mousemove', divMove, true);
		if($('#draggebel').css('top')!=='auto')
		{
			//I'm passing the event as silent , so I can set the x too without to re-render the view before bothe changes are applyed  
			currentSlide.set({_y:$('#draggebel').css('top')},{silent: true});
			currentSlide.set({_x:$('#draggebel').css('left')},{silent: true});
		}
	},
	
 
/* 
 * @method */
	mouseDown:function (e){
		
		//this function is called so I will be able to move the draggebel div , base on event's coordonates
		document.getElementById('slideWorkArea').addEventListener('mousemove', divMove, true);
		
		//I allso prevent the chields elements from DOM to capture the event e 
		e.preventDefault();
	},
	/* @method */
	updateText:function(){
		this.model.setText($('.text')[0].value);
	},
 
   
}); 

