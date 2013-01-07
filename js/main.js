require.config({
	baseUrl:'',
	paths: {
		jquery: 'js/libs/jquery/jquery-1.8.3',
		backbone: 'js/libs/backbone/backbone',
		underscore: 'js/libs/underscore/underscore'
	}
});

alert('merge?');

require(['js/modules/slideModules/slide'], function(slide){
  alert('merge acum?');
});