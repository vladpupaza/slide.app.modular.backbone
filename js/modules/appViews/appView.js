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


function($, _, Backbone,slideModules,toolbar, sidebar, content, type){
/**
 * @class Slide A Slide Model
 * @extends Backbone.Model
 * @constructor
 */	
	var AppView = function(){
/** 
 * @property
 * @type object
 */
		typeViewObj	= new type();	
/** 
 * @property
 * @type object
 */
		slideModulesObj = new slideModules();
/** 
 * @property
 * @type object
 */
		toolbarViewObj = new toolbar();
/**
 * @method
 * @param {exception} e An exception
 */		
		divMove = function (e){ 	
			var div = document.getElementById('draggebel'); 
			div.style.top = ( e.clientY -200)+ 'px';
			div.style.left = ( e.clientX -550)+ 'px';
		};
/** 
 * @property
 * @type object
 */
		sidebarViewObj = new sidebar({collection:slideModulesObj.slides});
	};
	return AppView;
});