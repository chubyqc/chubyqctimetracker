/**
 * @author chubyqc
 */
tt.filebased.TaskListener = new Class({
	
	Implements: tt.ITaskListener,
	
	parent: null,
	
	task: null,
	
	initialize: function(tracker, task) {
		this.parent = tracker;
		this.task = task;
	},
	
	updated: function() {
		this.parent.updated();
	},
	
	timeChanged: function(newTime) {
		this.task.timeElapsed = newTime;
		this.updated();
	},
	
	todo: function(todo) {
		this.task.todo = todo;
	},
	
	inputAdded: function(input) {
		var simpleInput = {
			content: null,
			templateInputUId: input.templateInput.getUId()
		}
		this.task.inputs.push(simpleInput);
		input.addListener(new tt.filebased.TaskInputListener(this, simpleInput));
		this.updated();
	},
	
	removed: function() {
		this.parent.taskRemoved(this.task);
	},
	
	inputRemoved: function(input) {
		this.task.inputs.erase(input);
		this.updated();
	}
});
