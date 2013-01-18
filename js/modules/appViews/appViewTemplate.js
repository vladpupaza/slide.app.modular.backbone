/*jshint multistr:true */
/*global define:false*/

define([], function(){
    "use strict";

    var appViewTemplate ={

	// Toolbar Template 
	toolbar_buttons :
	'<div class="navbar">\
        <div class="navbar-inner">\
            <div class="container">\
                <a class="btn btn-navbar" data-toggle="collapse" data-target=".navbar-responsive-collapse">\
                    <span class="icon-bar"></span>\
                    <span class="icon-bar"></span>\
                    <span class="icon-bar"></span>\
                </a>\
                <a class="brand" href="#">Slide Application</a>\
                <div class="nav-collapse collapse navbar-responsive-collapse">\
                    <ul class="nav">\
                        <li id="newPresentationBtn"><a>New Presentation</a></li>\
                        <li id="addSlideBtn"><a >Add Slide</a></li>\
                        <li id="removeSlideBtn"><a >Remove Slide</a></li>\
                        <li id="addImageToSlideBtn"><a >Add Image</a></li>\
                        <li id="removeImageFromSlideBtn"><a>Remove Image</a></li>\
                        <li id="addVideoBtn"><a >Add Video</a></li>\
                        <li id="removeVideoBtn"><a >Remove Video</a></li>\
                        <li id="slideshowBtn"><a >Slideshow</a></li>\
                        <li id="saveBtn"><a >Save</a></li>\
                        <li id="saveAsBtn"><a >Save As...</a></li>\
                        <li class="dropdown">\
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Select Presentation <b class="caret"></b></a>\
                            <ul id = "presentationOption" class="dropdown-menu">\
                                <li><a href="">none</a></li>\
                            </ul>\
                        </li>\
                    </ul>\
                </div><!-- /.nav-collapse -->\
            </div>\
        </div><!-- /navbar-inner -->\
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
		<div id="<%= id %>">\
			<img src="<%= _url %>" alt="1" style="width:460px; height:380px;" id="slide"/>\
			<%= _text %>\
		</div>\
	</div>',

	content_template_video:
	'<div id="slideWorkArea" class=".clearfix">\
		<div id="<%= id %>"> \
	<div id="draggebel" style="top:<%= _y %>;left:<%= _x %>;">\
			<video width="560" height="380" controls>\
				<source src="<%=_url%>" type="video/ogg">\
			</video>\
		</div>\
			<textarea class="text" maxlength="250" onkeyup="$(\'#contentView\').trigger(\'txtnbleft\')" onkeypress="$(\'#contentView\').trigger(\'txtnbleft\')"   rows="4" cols="50"><%= _text %></textarea>\
			<div id="txtnb"></div>\
		</div>\
	</div>',
	content_template_image: 
	'<div id="slideWorkArea" class=".clearfix">\
		<div id="<%= id %>">\
		<div id="draggebel" onclick="event.stopPropagation();" style="top:<%= _y %>;left:<%= _x %>;">\
			<img src="<%= _url %>" alt="1"  style="width:460px; height:380px;" id="slide"/> \
		</div>\
			<textarea class="text" maxlength="250" onkeyup="$(\'#contentView\').trigger(\'txtnbleft\')" onkeypress="$(\'#contentView\').trigger(\'txtnbleft\')"     rows="4" cols="50"><%= _text %></textarea>\
			<div id="txtnb"></div>\
		</div>\
	</div>',
	
 
	content_template_text:
	'<div id="slideWorkArea" class=".clearfix">\
		<div id="<%= id %>">\
		<div id="draggebel" style="top:<%= _y %>;left:<%= _x %>;">\
		</div>\
			<textarea class="text" maxlength="250" onkeyup="$(\'#contentView\').trigger(\'txtnbleft\')" onkeypress="$(\'#contentView\').trigger(\'txtnbleft\')"  rows="4" cols="50"><%= _text %></textarea>\
			<div id="txtnb"></div>\
		</div>\
	</div>'

};
return appViewTemplate;	
});	

