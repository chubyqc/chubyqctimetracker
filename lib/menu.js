/**
 * @author chubyqc
 */
tt.Menu = new Class({
	
	templates: null,
	tracker: null,
	
	initialize: function(templates, tracker) {
		this.templates = templates;
		this.tracker = tracker;
	},
	
	addHandlers: function(timeTracker) {
		this.templates.onclick = function() {
			timeTracker.showTemplates();
		};
		this.tracker.onclick = function() {
			timeTracker.showTracker();
		};
	}
});