/*global define,Application:true*/
define(['jquery','underscore','backbone','js/modules/slideModules/slideView','js/modules/appViews/contentView','js/libs/pubsub'],
function ($,_,Backbone,SlideView,ContentView,pubSub) {
/**
* @cfg sidebarView extends Backbone.View
*/
    "use strict";
    var sidebarView=Backbone.View.extend( {
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
            this.collection.bind("reset", this.resetColection,this);
           },

        resetColection:function(){
            this.el.html("");var i;
            for (i=0;i<this.collection.length;i++) {
                this.renderSlide(this.collection.at(i),i);
            }
            this.el.find("#0").addClass("currentSlide");
            window.location.href="#"+this.el.find("#0").parent('a').attr('href');
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
            this.el.find("#"+Application.idCurrent).addClass("currentSlide");    

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
            Application.idCurrent=this.collection.length-1;
            if(Application.idCurrent===(-1)) {
                $("#content").html("");
            }
		},
    /**
    * @method
    */
        renderAdd: function() {
            this.checkCollectionIsEmpty();
            this.render();  
            this.setCurrentSlide(Application.idCurrent);
 
        },
    /**
    * @method
    */  
        renderRem: function() {
            this.checkCollectionIsEmpty();
            this.render(); 
            if (Application.idCurrent !== -1) {
                this.setCurrentSlide(Application.idCurrent);
            }
 
        },
    /**
    * @method
    */
        selectSlide:function(e) {       
            //get currently selected slide
            var id =$(e.currentTarget).context.id; 
            this.setCurrentSlide(id);      
        },
    /**
    * @method
    * @param {Slide} currentSlide current selected slide of app
    * @param {int} index the index of current slide in our collection
    */
        setCurrentSlide:function(index) {
            //set current slide on sidebar
            $(".currentSlide").removeClass("currentSlide");
            $("#"+index).addClass("currentSlide");
            window.location.href="#"+this.el.find("#"+index).parent('a').attr('href'); 
            },
    /**
    *@mthod
    */ 
        setPresentation: function(){
            if (Application.slideModulesObj.slides.length >= 1) {
                var cs=Application.slideModulesObj.slides.at(0);

                Application.sidebarViewObj.setCurrentSlide(cs,0);
            } else {
                 $("#content").html("");
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
