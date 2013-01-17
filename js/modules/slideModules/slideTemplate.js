/*jshint multistr:true */
/*global define:false*/
define([], function() {
"use strict";
var slideTemplate = {
// SlideText Template
"Text" : 
'<div class="slideLittle"><div class="slideText"></div><%=_text%></div>',
// SlideVideo Template
"Video" :
'<div class="slideLittle">\
    <div class="slideVideo">\
        <video width="200" height="140" controls>\
        <source src="<%=_url%>" type="video/ogg">\
        Your browser does not support the video tag.\
        </video>\
    </div>\
    <%=_text%>\
</div>',
// SlideImage Template
"Image" :
'<div class="slideLittle">\
    <div class="slideImg">\
    <img src="<%=_url%>" alt="image" />\
    </div><%=_text%></div>'
};
return slideTemplate;
});