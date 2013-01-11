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

	var appView = function(){
//....we create a typeView object..........................................
		typeViewObj	= new type();	
//....we create a slideModules object......................................
		slideModulesObj = new slideModules();
//....we create a toolbarView object.......................................
		toolbarViewObj = new toolbar();
		divMove=	
		function (e){ 
			var div = document.getElementById('draggebel'); 
			div.style.top =( e.clientY -200)+ 'px';
			div.style.left =( e.clientX -540)+ 'px';
		};
//....we create a contentView object.......................................
		contentViewObj = new content({model:slideModulesObj.a});	
//....we create a sidebarView object.......................................
		sidebarViewObj = new sidebar({collection:slideModulesObj.slides});
	};
	return appView;
});