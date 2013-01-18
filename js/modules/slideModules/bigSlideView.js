define(['underscore', 'backbone','js/modules/appViews/appViewTemplate'], 
function(_, Backbone,Template) 
{
	"use strict";
    /*global Application:true*/
	
// private function that avoid users to inject html code
var escape_html= function(text){
        var t=text.replace(/&/g,"&amp;");
        t=t.replace(/>/g,"&gt;");
        t=t.replace(/</g,"&lt;");
        //t=t.replace(/'/g,"&quot;");
    return t;
    };
    
/* @class ContentView the class of content view
 * @extends Backbone.View
 * @param  as param recives the model of the curent slide
     */
var bigSlideView = Backbone.View.extend ({ 

    /**
     * @property
     * @type string
     */
    tagName : "div", 
    
    /**
     * @property
     * @type string
     */
    id :'contentView',
    
    /**
     * @property
     * @type Object
     */
    template : _.template(Template.content_template),
    
    
    /*@event  updateReady, fired from DOM , when the textarea lose focus
     *@event txtnbleft , fired when user start's to type in text area   */
    events: {
        //this event will be attached to the model elements in
        //the el of every view inserted by AppView below
        //"click": "alertMe",
        "updateReady":'updateText',
        "txtnbleft":'counter'
    },  
    /*
     *@method
     */
    counter : function() { 
        $("#txtnb").html("Characters left: "+(250-$('.text')[0].value.length));
    },
	
    /*
	 *@method
	 * called at initialize to change the tamplate , more specialized:))
	 */
	changeTemplate:function(){
		if (this.model.toJSON()._type === 'Image') {
			this.template = _.template(Template.content_template_image);
			}
		else if (this.model.toJSON()._type === 'Text') {
			this.template=_.template(Template.content_template_text);
		}
		else if(this.model.toJSON()._type==='Video') {
			this.template=_.template(Template.content_template_video);
		} 
	},
	
	/**
     * @initialize , at initialize , I give the view's template based on the model's type
     */
    initialize : function() {
        if (this.model instanceof Backbone.Model) {
			_.bindAll(this,"render","updateText");  
			this.model.bind('change',this.render,this);
			this.changeTemplate();
            // binding I binde the change event of the model , to method rander of the object 

			

        }
    },
    /**
    *@method
    */
    render : function() { 
		if (this.model instanceof Backbone.Model) {
			/* render it will place the view on DOM , and call the addListener function, 
			witch needs that those elements to be painted */
			$(this.el).html(this.template(this.model.toJSON()));
			/*addListeners : here I set those to elements to listen  for events like mousedown/mouseup,
			and then to do those functions */
			$(this.el).find('#draggebel').mousedown(this.mouseDown);
			$(this.el).find('#slideWorkArea').mouseup(  this.mouseUp);  
			$(this.el).find('.text').bind('focusout', this.updateText);
		}
		return this;
    }, 
 
    /**
     * @method 
     */
    mouseUp : function ()
    {
        document.getElementById('slideWorkArea').removeEventListener('mousemove', Application.divMove, true);
        if ($('#draggebel').css('top') !== 'auto') {
            //I'm passing the event as silent , so I can set the x too without to re-render the view
            //before bothe changes are applyed  
            Application.currentSlide.set({_y:$('#draggebel').css('top')},{silent: true});
            Application.currentSlide.set({_x:$('#draggebel').css('left')},{silent: true});
        }
    },
    /** 
    *@method 
    */
    mouseDown : function(e) {
        //this function is called so I will be able to move the draggebel div , base on event's 
        //coordonates
        document.getElementById('slideWorkArea').addEventListener('mousemove', Application.divMove, true);
        //I allso prevent the chields elements from DOM to capture the event e 
        e.preventDefault();
    },
    /**
    *@method 
    */
    updateText : function() {
		console.log('called');
        var text = $('.text')[0].value;
        this.model.set({"_text":escape_html(text)});
    }
});
return bigSlideView;
});


