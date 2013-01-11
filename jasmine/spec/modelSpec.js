describe('slide model test', function() {
	it('', function() {
		var slide = new Slide();
		expect(slide).toEqual(jasmine.any(Slide));
	})
	it('Can be created with defaul values for its attr', function() {
		var slide = new Slide();
		expect(slide.getText()).toBe(null);
		expect(slide.getType()).toBe(null);
		expect(slide.getUrl()).toBe(null);
	});
	it('Can set a value for its attr', function() {
		var s = new Slide();
		s.setText('test');
		expect(s.getText()).toEqual('test');
		s.setType('image');
		expect(s.getType()).toBe('image');
		s.setUrl('t.jpg');
		expect(s.getUrl()).toBe('t.jpg');
	});
	it('Fires a change event when the state changes', function() {
		var spy = jasmine.createSpy('-change event callback-');
		var slide = new Slide();
		slide.bind('change', spy);
		slide.set({_text:'test text'});
		expect(spy).toHaveBeenCalled();
	});
});