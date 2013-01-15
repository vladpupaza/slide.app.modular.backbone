/*jshint multistr:true */

define([], function(){

var appViewTemplate ={


	// Toolbar Template 
	toolbar_buttons :
	'<div id="toolbarB">\
	<button type="button" id="newPresentationBtn">New Presentation</button>\
	<button type="button" id="addSlideBtn">ADD SLIDE</button>\
	<button type="button" id="removeSlideBtn">Remove SLIDE</button>\
	<button type="button" id="addImageToSlideBtn">ADD IMAGE</button>\
	<button type="button" id="removeImageFromSlideBtn">REMOVE IMAGE</button>\
	<button type="button" id="addVideoBtn">Add Video</button>\
	<button type="button" id="removeVideoBtn">Remove Video</button>\
	<button type="button" id="slideshowBtn">Slideshow</button>\
	<button type="button" id="saveBtn">SAVE</button>\
	<button type="button" id="saveAsBtn">Save As...</button>\
	<div id="presentationDropdown">\
			<select id = "presentationOption">\
				<option value="Select Presentation">Select Presentation</option>\
			</select>\
	</div>\
	</div>\
	</div>\
	<div id="languageDtopdown">\
		<select id = "languageOption">\
			<option value="english" selected="selected">English</option>\
			<option value="romanian">Romanian</option>\
		</select>\
	</div>\
	<div id="wrapper"><div id="insertImageUrl">\
            <textarea name="myTextAreaImageUrl"cols="20" rows="2" id="myTextAreaUrl">Insert image url here</textarea>\
            <button type="button" id="addImageUrlBtn">Save</button>\
            <button type="button" id="cancelImageUrlBtn">Cancel</button>\
            <label></label>\
	</div></div>',


	// Typebar Template
	typebar_template :
	'<div class="slideType currentSlideType" id="typeText">\
		<p>type text</p>\
	</div>\
	<div class="slideType" id="typeImage">\
		<p>type image</p>\
	</div>\
	<div class="slideType" id="typeVideo">\
		<p>type video</p>\
	</div>',


	// Content Template
	content_template :
	'<div id="slideWorkArea">\
		<div id="<%= _type %>">\
			<img src="<%= _url %>" alt="1" style="width:460px; height:380px;" id="slide"/>\
			<%= _text %>\
		</div>\
	</div>',

	content_template_video:
	'<div id="slideWorkArea" class=".clearfix">\
		<div id="<%= _type %>"> \
	<div id="draggebel" style="top:<%= _y %>;left:<%= _x %>;">\
			<video width="560" height="380" controls>\
				<source src="<%=_url%>" type="video/ogg">\
			</video>\
		</div>\
			<textarea class="text" maxlength="250" onkeyup="$(\'#contentView\').trigger(\'txtnbleft\')" onkeypress="$(\'#contentView\').trigger(\'txtnbleft\')" onblur="$(\'#contentView\').trigger(\'updateReady\')"    rows="4" cols="50"><%= _text %></textarea>\
			<div id="txtnb"></div>\
		</div>\
	</div>',
	content_template_image: 
	'<div id="slideWorkArea" class=".clearfix">\
		<div id="<%= _type %>">\
		<div id="draggebel" onclick="event.stopPropagation();" style="top:<%= _y %>;left:<%= _x %>;">\
			<img src="<%= _url %>" alt="1"  style="width:460px; height:380px;" id="slide"/> \
		</div>\
			<textarea class="text" maxlength="250" onkeyup="$(\'#contentView\').trigger(\'txtnbleft\')" onkeypress="$(\'#contentView\').trigger(\'txtnbleft\')" onblur="$(\'#contentView\').trigger(\'updateReady\')"    rows="4" cols="50"><%= _text %></textarea>\
			<div id="txtnb"></div>\
		</div>\
	</div>',
	
 
	content_template_text:
	'<div id="slideWorkArea" class=".clearfix">\
		<div id="<%= _type %>">\
		<div id="draggebel" style="top:<%= _y %>;left:<%= _x %>;">\
		</div>\
			<textarea class="text" maxlength="250" onkeyup="$(\'#contentView\').trigger(\'txtnbleft\')" onkeypress="$(\'#contentView\').trigger(\'txtnbleft\')" onblur="$(\'#contentView\').trigger(\'updateReady\')"    rows="4" cols="50"><%= _text %></textarea>\
			<div id="txtnb"></div>\
		</div>\
	</div>'

};
return appViewTemplate;	
});	

