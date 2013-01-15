define(['jquery','underscore','backbone','js/modules/slideModules/slideView','js/modules/appViews/contentView','js/libs/pubsub'],
	function ($,_,Backbone,slideView,ContentView,pubSub)
{
/**
* @cfg sidebarView extends Backbone.View
*/
var sidebarView=Backbone.View.extend({
/**
* @property
* @type html element
*/
    el:$('#sidebar'),
    tagName:"div", 
/**
* @property defines all sidebar events
*/
    events: {
/**
* @event click
* Fires when button si clicked
* @param {Button} this
* @param {EventObject} e selectSlide
*/
        "click .slideLittle": "selectSlide"
    },
 /**
 * @method
 */
    initialize:function() {     
        _.bindAll(this, "render");
        this.collection.bind('change', this.render);
        this.collection.bind("add", this.renderAdd,this);
        this.collection.bind("remove", this.renderRem,this);
        this.collection.bind("reset", this.render);
        this.render();
    },
/**
* @method
*/
    render:function() {
        this.el.html("");
        var i;
        var sv;
        var nr=this.collection.length;
        console.log("Rendering "+nr+" slides...");
        for (i=0;i<nr;i++) {
            if(typeof this.collection.at(i).view==='undefined') {                
                sv=new slideView({model:this.collection.at(i)});            
                $(this.el).append(sv.render());
            } else {
                sv=this.collection.at(i).view;              
                $(this.el).append(sv.render());
            }
            $('div .slideLittle').last().attr("id",i);
        }
        $("#"+idCurrent).addClass("currentSlide");
        if(typeof currentSlide!=='undefined') {
            contentViewObj=new ContentView({model:currentSlide});
        }
    },
/**
* @method
*/
    renders: function() {
        $("#sidebar").html("");
        var i;
        var nr=this.collection.length;
        var sv;
        idCurrent=nr-1;
        if(idCurrent===(-1)) {
            $('#content').html(' ');
        }
        console.log("Rendering "+nr+" slides...");
        for (i=0;i<nr;i++) {
            if(typeof this.collection.at(i).view==='undefined') {                
                sv=new slideView({model:this.collection.at(i)});             
                $(this.el).append(sv.render());
            } else {
                sv=this.collection.at(i).view;              
                $(this.el).append(sv.render());
            }
        $('div .slideLittle').last().attr("id",i);
        }
    },
/**
* @method
*/
    renderAdd: function() {
        this.renders();
        currentSlide=slideModulesObj.slides.at(idCurrent);
        $("#"+(idCurrent)).addClass("currentSlide");
        contentViewObj=new ContentView({model:currentSlide});
    },
/**
* @method
*/  
    renderRem: function() {
        this.renders();
        console.log(idCurrent+" "+this.collection.length);
        if (idCurrent !== -1) {
            currentSlide=slideModulesObj.slides.at(idCurrent);
            $("#"+(idCurrent)).addClass("currentSlide");
            contentViewObj=new ContentView({model:currentSlide});
        }
    },
/**
* @method
*/
    selectSlide:function(e) {       
//get current slide
        e.preventDefault();
        var id =$(e.currentTarget).context.id;
        currentSlide=this.collection.at(id);
        idCurrent = id;
//set current slide on sidebar
        $(".currentSlide").removeClass("currentSlide");
        $("#"+idCurrent).addClass("currentSlide");              
        idCurrent = id;
//render current slide content
        contentViewObj=new ContentView({model:currentSlide});
    },
/**
* @method
* @param {Slide} currentSlide current selected slide of app
* @param {int} index the index of current slide in our collection
*/

		setCurrentSlide:function(currentSlide,index)
		{
 //set current slide on sidebar
				$(".currentSlide").removeClass("currentSlide");
				$("#"+index).addClass("currentSlide");
//render current slide content
				contentViewObj=new ContentView({model:currentSlide});
		},
		
		setPresentation: function(){
			if (slideModulesObj.slides.length>=1){
				var cs=slideModulesObj.slides.at(0);
				sidebarViewObj.setCurrentSlide(cs,0);
			} else{
			
			}
		},
		subscribeStatements: function(){
		pubSub.subscribe("change presentation reset collection",this.setPresentation); 
		}
	});
	return sidebarView;
});
