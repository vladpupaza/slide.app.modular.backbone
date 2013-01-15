## Slide Application with Backbone - Modular Development

# Requirements

Implement an online presentation system resembling the capabilities of MS Powerpoint or GDocs presentation.

Your job is to implement a web application to do that having the following specifications:

1. Has a toolbar area at the top, a left-hand sidebar showing the presentation slides and a content area next to the 
2. sidebar showing the current slide content
3. Allows adding and removing slides by clicking 2 buttons from the toolbar: Add slide & Remove slide
4. Allows selecting a slide from the sidebar and show it's contents
5. Allows Slideshow mode: By clicking a button from the toolbar labeled Slideshow the slides will begin to play 
6. automatically. The slide in the content area will change every 5 seconds.
7. Each slide can consist of an image or a video( but not both ) and an optional text. The image/video will be aligned 
8. to the left and the text, if present, will flow to the right hand side of image/video.
9. On the currently selected slide the user should be able to:

    a) Click an Add image button, then enter an image URL into a dialog box and the image will be added to the 
slide. The Add image button is active only when there is a slide selected and there isn't a video already 
added to the slide.
If there is already an image added to the current slide Add image turns into Remove image and the Add video 
button is disabled.

    b) Click an Add video button, then enter an YouTube embed code into a dialog box. The video will be added to 
the the currently selected slide. The Add video button is enabled only when there is a slide selected and there 
isn't an image already added to the slide.
If there is already a  video added to the current slide Add video turns into Remove video and the Add image 
button is disabled.

    c) Click an Add text button, then enter a text up to 250 characters in a dialog box that will open. 
The text will be added to the slide.
If there is already text added to the current slide, the Add text button will turn into Edit text and by 
clicking it a dialog box will open allowing the user to edit the slide text.

10. Save the current presentation. HTML5 LocalStorage should be used for persisting the information.Upon refreshing 
the page the presentation should be reconstructed.
11. The application must be developed using backbone.js and modular development.

# Requirements update

1. Develop the application using [Backbone.js](http://documentcloud.github.com/backbone) and [RequireJS](http://requirejs.org).
1. Code must pass validation on [JSHint] (http://jshint.com/).
2. Add comments in ext-doc format to your code.
3. Implement unit testing with Jasmine.
4. Add multiple presentation support in your application.

## Team

#### [Vlad Pupaza] (https://github.com/vladpupaza)
#### [Alexandra Vilcan] (https://github.com/alexandravilcan)
#### [Radu Iosif Moldovan] (https://github.com/radu-iosif-moldovan)
#### [Claudia Victoria Stefan] (https://github.com/ClaudiaStefan)
#### [Daniel Panc] (https://github.com/danielpanc)
#### [Cosmin Malutan] (https://github.com/cosmin-malutan)

## License

MIT License  
Copyright (c) Alexandra Vîlcan, Pupăză Vlad, Radu Moldovan Iosif, Claudia Victoria Ștefan, Daniel Panc, Cosmin Măluțan
