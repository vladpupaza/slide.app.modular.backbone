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

function($, _, Backbone, toolbar, slideModules, sidebar, content, type){
	var appView = function(){
	typeViewObj	= new type;	
	slideModulesObj = new slideModules;
	toolbarViewObj = new toolbar;
	divMove=	
	function (e){ 
		var div = document.getElementById('draggebel'); 
		div.style.top =( e.clientY -250)+ 'px';
		div.style.left =( e.clientX -550)+ 'px';
		
	
	};
	contentViewObj = new content({model:a});	
	sidebarViewObj = new sidebar({collection:slides});
	
	};
	return appView;

});