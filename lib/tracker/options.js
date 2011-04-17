tt.Options = new Class({
    
    Extends: tt.AbstractState,
	
	Implements: tt.IHasListeners,
    
    optionsAlwaysOnTop: null,
    optionsConcurrencyCount: null,
    
    options: {
        optionsAlwaysOnTop: function(value) {
            this.optionsAlwaysOnTop.checked = value;
            window.nativeWindow.alwaysInFront = value;
			return true;
        },
        optionsConcurrencyCount: function(value) {
			var intValue = parseInt(value);
			var valid = intValue == value;
			if (valid) {
				if (intValue < 0) {
					intValue = 0;
				}
			} else {
				alert('Such a value can\'t be accepted.');
			}
			this.optionsConcurrencyCount.value = intValue;
            return valid;
        }
    },
    
    initialize: function(element) {
        this.parent(element);
        var that = this;
        (this.optionsAlwaysOnTop = $('optionsAlwaysOnTop')).onchange = function() {
            that.optionChanged(this.id, this.checked);
        };
		(this.optionsConcurrencyCount = $('optionsConcurrencyCount')).onchange = function() {
            that.optionChanged(this.id, this.value);
        };
    },
    
    optionChanged: function(id, value) {
        var option = this.options[id];
        if (option) {
            if (option.apply(this, [value])) {
				this.informListeners(function(listener){
					listener.optionChanged(id, value);
				});
			}
        }
    }
});
