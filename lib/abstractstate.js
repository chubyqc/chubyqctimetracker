/**
 * @author chubyqc
 */
tt.AbstractState = new Class({
	
	element: null,
	
	timetracker: null,
	
	initialize: function(element, timetracker) {
		this.element = element;
		this.timetracker = timetracker;
	},
	
	show: function() {
		this.element.style.visibility = 'visible';
	},
	
	hide: function() {
		this.element.style.visibility = 'hidden';
	}
});
