/**
 * @author chubyqc
 */
tt.filebased.TrackerListener = new Class({
	
	Extends: tt.filebased.TimedWriter,
	
	Implements: tt.ITrackerListener,
	
	wasUpdated: false,
	
	tasks: [],
	
	initialize: function() {
		this.parent(tt.TRACKER_JSON);
	},

	getFileContent: function() {
		return this.tasks;
	},
	
	updated: function() {
		this.wasUpdated = true;
	},
	
	taskAdded: function(task) {
		var simpleTask = {
			templateUId: task.templateUId,
			timeElapsed: 0,
			inputs: []
		}
		this.tasks.push(simpleTask);
		task.addListener(new tt.filebased.TaskListener(this, simpleTask));
		this.updated();
	},
	
	taskRemoved: function(task) {
		this.tasks.erase(task);
		this.updated();
	}
});
