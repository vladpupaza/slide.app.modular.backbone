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

/**
 * @method
 */
  		initialize : function(){
   			if (this._id==null)this.set({_id:Math.random().toString(36).substr(2,9)});
  		}

	});
	return Slide;
});