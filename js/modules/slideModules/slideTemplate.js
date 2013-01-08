define([], function() {
var slideTemplate = {
 // SlideText Template
  slide_text : '<div class="slideLittle"><div class="slideText"></div></div>',
 


 // SlideVideo Template
  slide_video : ''
  +'<div class="slideLittle"><div class="slideVideo">'
   +'<video width="320" height="240" controls>'
      +'<source src="movie.ogg" type="video/ogg">'
    +'Your browser does not support the video tag.'
   +'</video>'
  +'</div></div>',


 // SlideImage Template
  slide_img : ''+
  '<div class="slideLittle"><div class="slideImg">'
   +'<img src="" alt="image" />'
  +'</div></div>',

};
return slideTemplate;
});