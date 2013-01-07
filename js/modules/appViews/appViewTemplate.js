define([], function() {
var appViewTemplate = {

	// Toolbar Template 
	var toolbar_buttons : ''  
  	+'<button type="button" id="addSlideBtn">ADD SLIDE</button>'
	+'<button type="button" id="removeSlideBtn">Remove SLIDE</button>'
	+'<button type="button" id="addImageToSlideBtn">ADD IMAGE</button>'
	+'<button type="button" id="removeImageFromSlideBtn">REMOVE IMAGE</button>'
	+'<button type="button" id="addVideoBtn">Add Video</button>'
	+'<button type="button" id="removeVideoBtn">Remove Video</button>'
	+'<button type="button" id="saveBtn">SAVE</button>'
	+'<div id="languageDtopdown">'
		+'<select id = "languageOption">'
			+'<option value="english" selected="selected">English</option>'
			+'<option value="romanian">Romanian</option>'
		+'</select>'
	+'</div>',


	// Typebar Template
	var typebar_template : '' 
	+'<div class="slideType currentSlideType" id="typeText">'
		+'<p>type text</p>'
	+'</div>'
	+'<div class="slideType" id="typeImage">'
		+'<p>type image</p>'
	+'</div>'
	+'<div class="slideType" id="typeVideo">'
		+'<p>type video</p>'
	+'</div>',


	// Content Template
	var content_template : '<div id="slideWorkArea"><div id="<%= _type %>"><img src="<%= _url %>" alt="1" style="width:200px; height:200px;" id="slide"/> <%= _text %></div></div>'
};
return appViewTemplate;	
});	
