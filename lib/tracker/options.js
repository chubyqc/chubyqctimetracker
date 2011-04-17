tt.Options = new Class({
    
    Extends: tt.AbstractState,
	
	Implements: tt.IHasListeners,
    
    alwaysOnTopChk: null,
    
    options: {
        optionsAlwaysOnTop: function(value) {
            this.optionsAlwaysOnTop.checked = value;
            window.nativeWindow.alwaysInFront = value;
        }
    },
    
    initialize: function(element, timeTracker) {
        this.parent(element);
        var that = this;
        (this.optionsAlwaysOnTop = $('optionsAlwaysOnTop')).onchange = function() {
            that.optionChanged(this.id, this.checked);
        };
    },
    
    optionChanged: function(id, value) {
        var option = this.options[id];
        if (option) {
            option.apply(this, [value]);
            this.informListeners(function(listener) {
    			listener.optionChanged(id, value);
    		});
        }
    }
});
