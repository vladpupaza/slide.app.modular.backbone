define([
    'jquery',
    'underscore',
    'backbone',
    'js/modules/slideModules/slideModules',
    'js/modules/appViews/toolbarView',
    'js/modules/appViews/sidebarView',
    'js/modules/appViews/typeView'
    ],

function ($, _, Backbone,SlideModules,Toolbar, Sidebar, Type) {
/**
 * @class AppModule A View representing the UI
 * @constructor
 */ 
    var AppModule = function () {
/** 
 * @property
 * @type object
 */
        typeViewObj = new Type();   
/** 
 * @property
 * @type object
 */
        slideModulesObj = new SlideModules();
/** 
 * @property
 * @type object
 */
        toolbarViewObj = new Toolbar();
/**
 * @method
 * @param {exception} e An exception
 */     
        divMove = function (e) {    
            var div = document.getElementById('draggebel'); 
            div.style.top = ( e.clientY -300)+ 'px';
            div.style.left = ( e.clientX -950)+ 'px';
        };
/** 
 * @property
 * @type object
 */
        sidebarViewObj = new Sidebar({collection:slideModulesObj.slides});
		sidebarViewObj.subscribeStatements();
    };
    return AppModule;
});