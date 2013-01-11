describe("Tests for slides", function() {
  it("can be created with default values", function() {
     var s=new Slide();
     expect(s.getType()).toBe(null);
     expect(s.getText()).toBe(null);
     expect(s.getUrl()).toBe(null);
  });

it('Fires a custom event when the state changes.', function() {

    var spy = jasmine.createSpy('-change event callback-');

    var s = new Slide();
    s.bind('change', spy);
    s.setText('Get oil change for car.');
    expect(spy).toHaveBeenCalled();
});

it ("can set text to slide",function(){
  var s=new Slide();
  s.setText("test text");
  expect(s.get("_text")).toBe("test text");
});
it ("can get text from slide",function(){
  var s=new Slide();
  s.set({_text:"test text"});
  expect(s.getText()).toBe("test text");
});
it ("can set type to slide",function(){
  var s=new Slide();
  s.setType("Image");
  expect(s.get("_type")).toBe("Image");
});
it ("can get type of slide",function(){
  var s=new Slide();
  s.set({_type:"Image"});
  expect(s.getType()).toBe("Image");
})
it ("can set url to slide",function(){
  var s=new Slide();
  s.setUrl("http://images.imagecomics.com/blog_images//243186060207361.jpg");
  expect(s.get("_url")).toBe("http://images.imagecomics.com/blog_images//243186060207361.jpg");
});
it ("can get url of slide",function(){
  var s=new Slide();
  s.set({_url:"http://images.imagecomics.com/blog_images//243186060207361.jpg"});
  expect(s.getUrl()).toBe("http://images.imagecomics.com/blog_images//243186060207361.jpg");
})

it("sets an id to our slide",function(){
  var s=new Slide();
  expect(s.get("_id")).not.toBe(null);
})
});

