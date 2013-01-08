define([], function(){

var appViewTemplate ={


	// Toolbar Template 
	toolbar_buttons : '<div id="toolbarB">'  
  	+'<button type="button" id="addSlideBtn">ADD SLIDE</button>'
	+'<button type="button" id="removeSlideBtn">Remove SLIDE</button>'
	+'<button type="button" id="addImageToSlideBtn">ADD IMAGE</button>'
	+'<button type="button" id="removeImageFromSlideBtn">REMOVE IMAGE</button>'
	+'<button type="button" id="addVideoBtn">Add Video</button>'
	+'<button type="button" id="removeVideoBtn">Remove Video</button>'
	+'<button type="button" id="saveBtn">SAVE</button>'
	+'</div>'
	+'<div id="languageDtopdown">'
		+'<select id = "languageOption">'
			+'<option value="english" selected="selected">English</option>'
			+'<option value="romanian">Romanian</option>'
		+'</select>'
	+'</div>'
	+'<div id="insertText">'
            +'<textarea name="myTextAreaText"cols="20" rows="10" id="myTextAreaSlideText">Please limit your response to 100 characters.</textarea>'
            +'<button type="button" id="saveTextSlideBtn">Save</button>'
	+'</div> '
	+'<div id="insertImageUrl">'
            +'<textarea name="myTextAreaImageUrl"cols="20" rows="2" id="myTextAreaUrl">Insert image url here</textarea>'
            +'<button type="button" id="addImageUrlBtn">Save</button>'
	+'</div>',


	// Typebar Template
	typebar_template : '' 
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
	content_template : '<div id="slideWorkArea"><div id="<%= _type %>"><img src="<%= _url %>" alt="1" style="width:200px; height:200px;" id="slide"/> <%= _text %></div></div>'
};
return appViewTemplate;	
});	

