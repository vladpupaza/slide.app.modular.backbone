describe('Slide view test', function() {
    var slide=new Slide()
    slide.set({_type:'Text',id:'',_text:''});
    var v= new SlideView({model:slide});
    it('Corectly loads the template for a text slide', function() {
        k=v.render();
        console.log(k);
        expect(k).toEqual('<a href="#/slide/"><div class="slideLittle"><div class="slideText"></div></div></a>')
        
    })
    it('Corectly loads the template for an image slide', function() {
    })
    it('Corectly loads the template for a video slide', function() {
    })
})

