define(['jquery','underscore','backbone','js/modules/slideModules/slideView','js/modules/appViews/contentView','js/modules/slideModules/slides'],function ($,_,Backbone,slideView,ContentView)
{
	var sidebarView=Backbone.View.extend({
		el:$('#sidebar'),
		tagName:"div", 
		events: {
         //this event will be attached to the model elements in
         //the el of every view inserted by AppView below
        "click .slideLittle": "selectSlide"},
		initialize:function()
		{
			
			_.bindAll(this, "render");
			this.collection.bind('change', this.render);
			this.collection.bind("add", this.renderAdd,this);//colectia se va reranda la add,remove si reset
			this.collection.bind("remove", this.renderRem,this);
			this.collection.bind("reset", this.render);
			this.render();
		},
		
		renders: function(){
		$("#sidebar").html("");
			var i;
			var nr=this.collection.length;
			idCurrent=nr-1;
			console.log("Rendering "+nr+" slides...");
			for (i=0;i<nr;i++)
			{
				var sv=new slideView({model:this.collection.at(i)});//trimit view'uliu un model de tip slide

				$(this.el).append(sv.render());

				$('div .slideLittle').last().attr("id",i);
			}
		},
		renderAdd: function(){
			this.renders();
			currentSlide=slideModulesObj.slides.at(idCurrent);
			$("#"+(idCurrent)).addClass("currentSlide");
			contentViewObj=new ContentView({model:currentSlide});
			
		},
		
		renderRem: function(){
			this.renders();
			console.log(":::"+idCurrent+" "+this.collection.length+"sadasdasdasdasasd");
			currentSlide=slideModulesObj.slides.at(idCurrent);
			$("#"+(idCurrent)).addClass("currentSlide");
			contentViewObj=new ContentView({model:currentSlide});
		},
		
		selectSlide:function(e)
		{
				//get current slide
				e.preventDefault();
				var id =$(e.currentTarget).context.id;
				if(typeof currentSlide!=='undefined') contentViewObj=new ContentView({model:currentSlide});
				currentSlide=this.collection.at(id);
				idCurrent = id;
				
				//set current slide on sidebar
				$(".currentSlide").removeClass("currentSlide");
				$("#"+idCurrent).addClass("currentSlide");
		
				//render current slide content
				contentViewObj=new ContentView({model:currentSlide});



		},

		setCurrentSlide:function(currentSlide,index)
		{
							
				//set current slide on sidebar
				$(".currentSlide").removeClass("currentSlide");
				$("#"+index).addClass("currentSlide");
				
				//render current slide content
				contentViewObj.model=currentSlide;
				contentViewObj.initialize();
		}

	});
	return sidebarView;
});