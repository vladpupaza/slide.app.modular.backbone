describe('Slide view test', function() {
    var slide=new Slide()
    slide.set({_type:'Text',id:'',_text:''});
    var v= new SlideView({model:slide});
    it('Corectly loads the template for a text slide', function() {
        k=v.render();
       
        expect(k).toEqual('<a href="#/slide/"><div class="slideLittle"><div class="slideText"></div></div></a>')
        
    })
    it('Corectly loads the template for an image slide', function() {
        slide.set({_type:'Image',id:'',_text:''});
        k=v.render();       
        expect(k).toEqual(v.renders("Image"));
    })
    it('Corectly loads the template for a video slide', function() {
        slide.set({_type:'Video',id:'',_text:''});
        k=v.render();       
        expect(k).toEqual(v.renders("Video"));
    })



})

