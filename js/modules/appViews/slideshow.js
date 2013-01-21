window.Application.slideshow = function(){
    if (window.Application.slideModulesObj.slides.length === 0) {            
            alert("No slides to be shown");
        } else {     
            $("#slideshowMode").css('visibility','visible');
            window.Application.nextSlide(0,this); 
        }
}
/**
*@method
*@ hides slideshow notify bar
*/
window.Application.hideSlideshowBar= function(i,slidesLength,timer){
        if (i === slidesLength-1) {
            clearInterval(timer);
            $("#slideshowMode").css('visibility','hidden');
        }
}
/**
* @method
* @shows the next slide
*/
window.Application.nextSlide = function(i,that){
    var timer = setInterval(function () {
        Application.sidebarViewObj.setCurrentSlide(i);
        window.location.href=('#/slide/'+window.Application.slideModulesObj.slides.at(i).id);
        window.Application.hideSlideshowBar(i,window.Application.slideModulesObj.slides.length,timer);           
        i++;
    },4000);
}