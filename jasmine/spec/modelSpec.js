describe('slide model test', function() {
	it('Can create a slide', function() {
		var slide = new Slide();
		expect(slide).toEqual(jasmine.any(Slide));
	})
	it('Can be created with defaul values for its attr', function() {
		var slide = new Slide();
		expect(slide.get('_text')).toBe(null);
		expect(slide.get('_type')).toBe(null);
		expect(slide.get('_url')).toBe(null);
	});
	it('Can set a value for its attr', function() {
		var s = new Slide();
		s.set({ _text : 'test' });
		expect(s.get('_text')).toEqual('test');
		s.set({ _type : 'image' });
		expect(s.get('_type')).toBe('image');
		s.set({ _url : 't.jpg' });
		expect(s.get('_url')).toBe('t.jpg');
	});
	it('Fires a change event when the state changes', function() {
		var spy = jasmine.createSpy('-change event callback-');
		var slide = new Slide();
		slide.bind('change', spy);
		slide.set({ _text:'test text' });
		expect(spy).toHaveBeenCalled();
	});
});