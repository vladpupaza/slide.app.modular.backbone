/*global define:false*/
define([
    'jquery',
    'underscore',
    'backbone',
    'js/modules/slideModules/slideModules',
    'js/modules/appViews/toolbarView',
    'js/modules/appViews/sidebarView',
    'js/modules/appViews/contentView',
    'js/modules/appViews/typeView'
    ],

function ($, _, Backbone,SlideModules,Toolbar, Sidebar, Content, Type) {
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
        window.typeViewObj = new Type();   
/** 
 * @property
 * @type object
 */
        window.slideModulesObj = new SlideModules();
/** 
 * @property
 * @type object
 */
        window.toolbarViewObj = new Toolbar();
/**
 * @method
 * @param {exception} e An exception
 */     
        window.divMove = function (e) {    
            var div = document.getElementById('draggebel'); 
            div.style.top = ( e.clientY -300)+ 'px';
            div.style.left = ( e.clientX -750)+ 'px';
        };
		window.contentView=new Content();

/** 
 * @property
 * @type object
 */
        window.sidebarViewObj = new Sidebar({collection:slideModulesObj.slides});
		window.sidebarViewObj.subscribeStatements();
    };
    return AppModule;
});