/**
 * @author chubyqc
 */
tt.AbstractState = new Class({
	
	element: null,
	
	initialize: function(element) {
		this.element = element;
	},
	
	show: function() {
		this.element.style.visibility = 'visible';
	},
	
	hide: function() {
		this.element.style.visibility = 'hidden';
	}
});
