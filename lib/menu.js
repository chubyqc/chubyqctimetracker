/**
 * @author chubyqc
 */
tt.Menu = new Class({
	
	templates: null,
	tracker: null,
	hide: null,
	close: null,
	
	initialize: function(templates, tracker, hide, close) {
		this.templates = templates;
		this.tracker = tracker;
		this.hide = hide;
		this.close = close;
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