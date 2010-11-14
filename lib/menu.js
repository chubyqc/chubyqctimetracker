/**
 * @author chubyqc
 */
tt.Menu = new Class({
	
	templates: null,
	tracker: null,
    resetTime: null,
	hide: null,
	close: null,
	
	initialize: function(templates, tracker, resetTime, hide, close) {
		this.templates = templates;
		this.tracker = tracker;
        this.resetTime = resetTime;
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
		this.resetTime.onclick = function() {
			timeTracker.resetTime();
		};
	}
});