/*global define:false*/
define([
    'jquery',
    'underscore',
    'backbone',
    'js/modules/slideModules/slideModules',
    'js/modules/appViews/presentationOptionView',
    'js/modules/appViews/toolbarView',
    'js/modules/appViews/sidebarView',
    'js/modules/appViews/contentView',
    'js/modules/appViews/typeView',
    'js/modules/appViews/saveFeatures'
    
    ],


function ($, _, Backbone,SlideModules,PresentationOptionView,Toolbar, Sidebar, Content, Type,saveFeatures) {

/**
 * @class AppModule A View representing the UI
 * @constructor
 */ 
    "use strict";
    /*global slideModulesObj:false*/
    var AppModule = function () {

/** 
 * @property
 * @type object
 */
        Application.typeViewObj = new Type();   
/** 
 * @property
 * @type object
 */
        Application.slideModulesObj = new SlideModules();
/** 
 * @property
 * @type object
 */
       
      //  Application.toolbarViewObj = new Toolbar();
       Application.saveFeautreObj = new saveFeatures();

        Application.presentationOptionViewObj = new PresentationOptionView();
        Application.presentationOptionViewObj.subscribeStatements();

		
		var content=new Content();		
		var Router = Backbone.Router.extend({
			routes:{
				'':'home',
				'slide/:id':'bigSlideView'
			},
			bigSlideView:function(id){
				content.render({id:id});
				}
		});
		

		Application.router=new Router(); 
		
		Backbone.history.start();

/**
 * @method
 * @param {event} e An event of mouse down pased as param 
 */     
        Application.divMove = function (e) {    
            var div = document.getElementById('draggebel'); 
            div.style.top = ( e.clientY -300)+ 'px';
            div.style.left = ( e.clientX -750)+ 'px';
        };

/** 
 * @property
 * @type object
 */
        Application.sidebarViewObj = new Sidebar({collection:Application.slideModulesObj.slides});
		Application.sidebarViewObj.subscribeStatements();
    };
    return AppModule;
});