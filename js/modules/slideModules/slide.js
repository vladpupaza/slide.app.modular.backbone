define(['underscore', 'backbone'], function(_, Backbone) {
/**
 * @class Slide A Slide Model
 * @extends Backbone.Model
 * @constructor
 */	
	var Slide = Backbone.Model.extend({
		defaults: {
/** 
 * @property
 * @type string
 */
			'_id':null,
/** 
 * @property
 * @type string
 */
			"_type" : 'Image',
/** 
 * @property
 * @type string
 */			
			"_text" : null,
/** 
 * @property
 * @type string
 */			
			"_url" :null,
/** 
 * @property
 * @type string
 */			 
			'_x':'150',
/** 
 * @property
 * @type string
 */			
   			'_y':'50'
  		},
<<<<<<< HEAD
//......initializa a slide........................................................
  		initialize:function(){
   		if (this.id==null)this.set({id:Math.random().toString(36).substr(2,9)});
   		//console.log(this.id);
  		}, 
//......setType method by param type..............................................
		setType  : function(type) {
			this.set({ _type : type });
		},
//...... setText method by param type.............................................
		setText : function(text) {
			this.set({ _text : text });
		},
//...... setUrl method by param type..............................................
		setUrl : function(url) {
			this.set({ _url : url });
		},
//...... getType method -> returns the _type attribute............................
		getType : function() {
			return this.get('_type');
		},
//...... getText method -> returns the _text attribute............................
		getText : function() {
			return this.get('_text');
		},
//...... getUrl method -> returns the _url attribute..............................
		getUrl : function() {
			return this.get('_url');
		},
//...... subscribe obj............................................................
        
=======
/**
 * @method
 */
  		initialize : function(){
   			if (this._id==null)this.set({_id:Math.random().toString(36).substr(2,9)});
  		}
>>>>>>> d9583bc4d2e3bdcc358d3b545529a6129983a6e2
	});
	return Slide;
});