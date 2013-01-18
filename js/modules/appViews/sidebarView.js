/*global define,idCurrent,slideModulesObj,sidebarViewObj:true*/
define(['jquery','underscore','backbone','js/modules/slideModules/slideView','js/modules/appViews/contentView','js/libs/pubsub'],
    function ($,_,Backbone,SlideView,ContentView,pubSub)
{
/**
* @cfg sidebarView extends Backbone.View
*/
    "use strict";
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
            this.render();
            this.collection.bind('change', this.render,this);
            this.collection.bind("add", this.renderAdd,this);
            this.collection.bind("remove", this.renderRem,this);
            this.collection.bind("reset", this.render,this);
           },
    /**
    * @method
    */
        render:function() {
            this.el.html("");
            var i;
            for (i=0;i<this.collection.length;i++) {
                    this.renderSlide(this.collection.at(i),i);                
            }
            this.el.find("#"+idCurrent).addClass("currentSlide");          
        },
    /**
    *@method
    */
        renderSlide:function(slide,index) {
            if (typeof slide.view === 'undefined') {
                var sv=new SlideView({model:slide});            
                $(this.el).append(sv.render());
            } else {
                $(this.el).append(slide.view.render());
            }
            $('div .slideLittle').last().attr("id",index);
        },

    /**
    * @method
    */
        checkCollectionIsEmpty: function() {
            $("#sidebar").html("");
            window.idCurrent=this.collection.length-1;
            if(window.idCurrent===(-1)) {
                $("#content").html("");
            }
<<<<<<< HEAD
        },
    /**
    * @method
    */
        renderAdd: function() {
            this.checkCollectionIsEmpty();
            this.render();
            window.currentSlide = slideModulesObj.slides.at(idCurrent);
            $("#"+(idCurrent)).addClass("currentSlide");
        },
    /**
    * @method
    */  
        renderRem: function() {
            this.checkCollectionIsEmpty();
            this.render();
            if (idCurrent !== -1) {
                window.currentSlide = slideModulesObj.slides.at(idCurrent); 
                $("#"+(idCurrent)).addClass("currentSlide");
            }
        },
    /**
    * @method
    */
        selectSlide:function(e) {       
    //get current slide
            var id =$(e.currentTarget).context.id;
            window.currentSlide=this.collection.at(id); 
            window.currentSlide.view.bigSlideViewRender();
            window.idCurrent = id;
    //set current slide on sidebar
            $(".currentSlide").removeClass("currentSlide");
            $("#"+idCurrent).addClass("currentSlide");              
        },
    /**
    * @method
    * @param {Slide} currentSlide current selected slide of app
    * @param {int} index the index of current slide in our collection
    */
=======
        $('div .slideLittle').last().attr("id",i);
        }
    },
/**
* @method
*/
    renderAdd: function() {
        this.renders();
        currentSlide=slideModulesObj.slides.at(idCurrent);  
		window.location.href="#/slide/"+currentSlide.id;
        $("#"+(idCurrent)).addClass("currentSlide");
    },
/**
* @method
*/  
    renderRem: function() {
        this.renders();
        console.log(idCurrent+" "+this.collection.length);
        if (idCurrent !== -1) {
            currentSlide=slideModulesObj.slides.at(idCurrent); 
			window.location.href="#/slide/"+currentSlide.id;
            $("#"+(idCurrent)).addClass("currentSlide");
        }
    },
/**
* @method
*/
    selectSlide:function(e) {       
//get current slide
        //e.preventDefault();
        var id =$(e.currentTarget).context.id;
        currentSlide=this.collection.at(id); 
		idCurrent = id;
//set current slide on sidebar
        $(".currentSlide").removeClass("currentSlide");
        $("#"+idCurrent).addClass("currentSlide");              
>>>>>>> with router

            setCurrentSlide:function(cs,index) {
            //set setCurrentSlide
                    window.currentSlide=cs;
            //set current slide on sidebar
                    $(".currentSlide").removeClass("currentSlide");
                    $("#"+index).addClass("currentSlide");
            },
    /**
    *@mthod
    */
            
            setPresentation: function(){
                if (slideModulesObj.slides.length >= 1) {
                    var cs=slideModulesObj.slides.at(0);
                    sidebarViewObj.setCurrentSlide(cs,0);
                } 
            },
    /**
    *@mthod
    */
            subscribeStatements: function() {
                pubSub.subscribe("change presentation reset collection",this.setPresentation); 
            }
    });
    return sidebarView;

});
