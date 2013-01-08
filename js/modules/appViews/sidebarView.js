define(['jquery','underscore','backbone','js/modules/slideModules/slideView','js/modules/appViews/contentView'],function ($,_,Backbone,slideView,contentView)
{
	var sidebarView=Backbone.View.extend({
		el:$('#sidebar'),
		tagName:"div",
		events: {
         //this event will be attached to the model elements in
         //the el of every view inserted by AppView below
        	"click .slideLittle": "selectSlide"
    	},
		initialize:function()
		{
			this.undelegateEvents();
			 _.bindAll(this, "render");
			 this.render();
			this.collection.bind("add", this.render);//colectia se va reranda la add,remove si reset
			this.collection.bind("remove", this.render);
			this.collection.bind("reset", this.render);
		},

		render:function()
		{
			$("#sidebar").html("");
			var i;
			var nr=this.collection.length;
			console.log("Rendering "+nr+" slides...")
			for (i=0;i<nr;i++)
			{
				var sv=new slideView({model:this.collection.at(i)});//trimit view'uliu un model de tip slide
				sv.render();
				$('div .slideLittle').last().attr("id",i);
			}
		},
		selectSlide:function(e)
		{
				//get current slide
				e.preventDefault();
				var id =$(e.currentTarget).context.id;
				var currentSlide=this.collection.at(id);
				
				//set current slide on sidebar
				$(".currentSlide").removeClass("currentSlide");
				$("#"+id).addClass("currentSlide");

				//render current slide content
				var cv=new contentView({model:currentSlide});

		}

	});
	return sidebarView;
});