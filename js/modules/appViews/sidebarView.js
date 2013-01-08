define(['jquery','underscore','backbone','js/modules/slideModules/slideView'],function ($,_,Backbone,slideView)
{
	var sidebarView=Backbone.View.extend({

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
		}

	});
	return sidebarView;
});