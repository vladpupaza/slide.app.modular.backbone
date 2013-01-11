describe('Content View test', function() {
    slide = new Slide(); 
	slide.set({_type:'Text',id:"gqz544owc",_text:''});
	beforeEach(function() {
		
		this.content = new ContentView({model:slide});
	});
	it('View el must be div', function() {
		
		expect(this.content.el.nodeName).toEqual('DIV');
	})
	it('expects contentView to have an ID equal to contentView',function(){
		expect(this.content.el.id).toEqual('contentView');
	})
	it('expects contentView  to render',function(){
		expect(this.content.render()).toEqual(this.content);
	})
	it('content view produces correct HTML code',function(){
		expect(this.content.render().el.innerHTML).toEqual(	'<div id="slideWorkArea" class=".clearfix"><div id="Text"></div></div>');
	})
});