    var PresentationOptionView = Backbone.View.extend({
        /**
        * @property
        * @type html element
        */
        el:$("#toolbar"),
        id:'presentationOption',
         /**
        * @event click
        * Fires when button si clicked
        * @param {Button} this
        * @param {EventObject} e selectSlide
        */
        events:{
            "click #presentationOption li ": "selectPresentation"
        },
        /**
        * @method
        */
        initialize:function() {
            this.render();
        },
        /**
        * @method
        */
        render:function() {
            this.loadNamesFromLocalStorage();
        },
        /**
        * @method
        * adds a new created presentation name to drop-down
        */
        addPresentation:function(msg,data) {
            $("#presentationOption").append('<li class="options" value='+data+'>'+data+'</li>');
         },
        /**
        * @method
        * fires when user clicks one of drop-down options
        */
        selectPresentation : function(e) {
                var name=$(e.currentTarget).context.textContent;
                Application.currentPresentation=name;
				window.location.href="#";
                pubSub.publish("change presentation",name);
                window.location.href="#";
        },
        /**
        * @method
        * sets current presentation
        */
        setCurrentPresentation:function(msg,name) {
            pubSub.publish("change presentation",name);
        },
        /**
        * @method
        *fills drop-down with presentation names
        */
        fillDropDown:function(names,count){
            var i;
            var html="";
            for (i=0;i<count;i++) {
                this.el.find("#presentationOption").append('<li class="options" value='+names[i]+'>'+names[i]+'</li>');
                html=html+'<li class="options" value='+names[i]+'>'+names[i]+'</li>'
            }
            return html;
        },
        /**
        * @method
        *gets all presentation names from localstorage
        */ 
        loadNamesFromLocalStorage: function() {
            var names = JSON.parse(localStorage.getItem("presentations"));
            if(names !== null){
                //this.fillDropDown(names,names.length);
                return names;
            }
        },
        /**
        * @method
        */ 
        subscribeStatements:function(){
            pubSub.subscribe("presentationAdded",this.addPresentation),
            pubSub.subscribe("setCurrentPresentation",this.setCurrentPresentation);
        }
    });
