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
	
	+'<div id="wrapper"><div id="insertImageUrl">'
            +'<textarea name="myTextAreaImageUrl"cols="20" rows="2" id="myTextAreaUrl">Insert image url here</textarea>'
            +'<button type="button" id="addImageUrlBtn">Save</button>'
	+'</div></div>',


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
	content_template :
	'<div id="slideWorkArea">\
		<div id="<%= _type %>">\
			<img src="<%= _url %>" alt="1" style="width:200px; height:200px;" id="slide"/>\
			<%= _text %>\
		</div>\
	</div>',

	content_template_video:
	'<div id="slideWorkArea">\
		<div id="<%= _type %>">Video template\
		<div id="draggebel">\
			<video width="200" height="140" controls>\
				<source src="<%=_url%>" type="video/ogg">\
			</video>\
		</div>\
			<textarea class="text"  onblur="$(\'#content\').trigger(\'updateReady\')"    rows="4" cols="50">\
				<%= _text %>\
			</textarea>\
		</div>\
	</div>',
	content_template_image: 
	'<div id="slideWorkArea">\
		<div id="<%= _type %>">\
		<div id="draggebel">\
			<img src="<%= _url %>" alt="1" style="width:200px; height:200px;" id="slide"/> \
		</div>\
			<textarea class="text" onblur="$(\'#content\').trigger(\'updateReady\')"   rows="4" cols="50">\
				<%= _text %>\
			</textarea>\
		</div>\
	</div>',
	
 
	content_template_text:
	'<div id="slideWorkArea">\
		<div id="<%= _type %>">\
		<div id="draggebel">\
		</div>\
			<textarea class="text"  onblur="$(\'#content\').trigger(\'updateReady\')"    rows="4" cols="50">\
				<%= _text %>\
			</textarea>\
		</div>\
	</div>'

};
return appViewTemplate;	
});	

