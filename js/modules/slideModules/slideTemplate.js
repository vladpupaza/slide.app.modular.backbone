define([], function() {
var slideTemplate = {
 // SlideLittle Template
  slide_little : '<div class="slideLittle"></div>',
 

 // SlideText Template
  slide_text : '<div class="slideText"></div>',
 


 // SlideVideo Template
  slide_video : ''
  +'<div class="slideVideo">'
   +'<video width="320" height="240" controls>'
      +'<source src="movie.ogg" type="video/ogg">'
    +'Your browser does not support the video tag.'
   +'</video>'
  +'</div>',


 // SlideImage Template
  slide_img : ''+
  '<div class="slideImg">'
   +'<img src="" alt="image" />'
  +'</div>',
};
return slideTemplate;
});