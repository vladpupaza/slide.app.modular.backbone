define(['underscore', 'backbone','js/modules/appViews/appViewTemplate','js/libs/pubsub'], 
function(_, Backbone,Template,pubSub) {

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
        if (this.model) {
			_.bind(this.render,this);  
			this.changeTemplate();
            // binding I binde the change event of the model , to method rander of the object 
            this.model.bind('change',this.initialize);  
            //I prevent rendering if the Id is null , so I cannot render an invalid model 
            if (this.model.get('_id') !== null) { 
                this.render(); 
            }
        }
    },
    /**
    *@method
    */
    render : function() { 
        /* render it will place the view on DOM , and call the addListener function, 
        witch needs that those elements to be painted */
        $(this.el).html(this.template(this.model.toJSON()));
		
        /*addListeners : here I set those to elements to listen  for events like mousedown/mouseup,
        and then to do those functions */
        $(this.el).find('#draggebel').mousedown(this.mouseDown);
        $(this.el).find('#slideWorkArea').mouseup(  this.mouseUp);
		pubSub.publish('content', this.el);
        return this;
    }, 
 
    /**
     * @method 
     */
    mouseUp : function ()
    {
        document.getElementById('slideWorkArea').removeEventListener('mousemove', divMove, true);
        if ($('#draggebel').css('top') !== 'auto') {
            //I'm passing the event as silent , so I can set the x too without to re-render the view
            //before bothe changes are applyed  
            currentSlide.set({_y:$('#draggebel').css('top')},{silent: true});
            currentSlide.set({_x:$('#draggebel').css('left')},{silent: true});
        }
    },
    /** 
    *@method 
    */
    mouseDown : function(e) {
        //this function is called so I will be able to move the draggebel div , base on event's 
        //coordonates
        document.getElementById('slideWorkArea').addEventListener('mousemove', divMove, true);
        //I allso prevent the chields elements from DOM to capture the event e 
        e.preventDefault();
    },
    /**
    *@method 
    */
    updateText : function() {
        var text = $('.text')[0].value;
        this.model.set({"_text":text});
    }
});
return bigSlideView;
});


