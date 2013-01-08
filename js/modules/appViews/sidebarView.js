define(['jquery','underscore','backbone','js/modules/slideModules/slideView'],function ($,_,Backbone,slideView)
{
	var sidebarView=Backbone.View.extend({
		el:$('#sidebar'),
		tagName:"div",
		events: {
         //this event will be attached to the model elements in
         //the el of every view inserted by AppView below
        	"click": "selectSlide"
    	},
		initialize:function()
		{
			this.render();
		},

		render:function()
		{
			var i;
			var nr=this.collection.length;
			console.log("Rendering "+nr+" slides...")
			for (i=0;i<nr;i++)
			{
				var sv=new slideView({model:this.collection.at(i)});
			}
		},
		selectSlide:function()
		{
				console.log("clicked");
		}

	});
	return sidebarView;
});