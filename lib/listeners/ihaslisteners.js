/**
 * @author chubyqc
 */
tt.IHasListeners = new Class({
	
	listeners: [],
	
	addListener: function(listener) {
		this.listeners.push(listener);
	},
	
	informListeners: function(action) {
		for (var i = 0; i < this.listeners.length; ++i) {
			action(this.listeners[i]);
		}
	}
});
