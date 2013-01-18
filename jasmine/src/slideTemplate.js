
"use strict";
var slideTemplate = {
// SlideText Template
"Text" : 
'<a href="#/slide/<%= id %>"><div class="slideLittle"><div class="slideText"></div><%=_text%></div></a>',
// SlideVideo Template
"Video" :
'<a href="#/slide/<%= id %>">\
<div class="slideLittle">\
    <div class="slideVideo">\
        <video width="200" height="140" controls>\
        <source src="<%=_url%>" type="video/ogg">\
        Your browser does not support the video tag.\
        </video>\
    </div>\
    <%=_text%>\
</div></a>',
// SlideImage Template
"Image" :
'<a href="#/slide/<%= id %>">\
	<div class="slideLittle">\
    <div class="slideImg">\
    <img src="<%=_url%>" alt="image" />\
    </div><%=_text%></div></a>'
};
