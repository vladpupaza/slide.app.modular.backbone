define(['underscore', 'backbone'], function(_, Backbone) {
/**
 * @class Slide A Slide Model
 * @extends Backbone.Model
 * @constructor
 */ 
    "use strict";
    var Slide = Backbone.Model.extend ( {
        defaults: {
/** 
 * @property
 * @type string
 */
            'id': null,
/** 
 * @property
 * @type string
 */
            "_type": 'Image',
/** 
 * @property
 * @type string
 */         
            "_text": null,
/** 
 * @property
 * @type string
 */         
            "_url": null,
/** 
 * @property
 * @type string
 */          
            '_x': '150',
/** 
 * @property
 * @type string
 */         
            '_y': '50'
        },
/**
 * @method
 */
        initialize: function () {
            if (this.id === null) {
                this.set({id:Math.random().toString(36).substr(2,9)});
            }
        }
    });
    return Slide;
});