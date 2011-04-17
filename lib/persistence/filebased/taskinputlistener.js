/**
 * @author chubyqc
 */
tt.filebased.TaskInputListener = new Class({
	
	Implements: tt.ITaskInputListener,
	
	parent: null,
	
	input: null,
	
	initialize: function(task, input) {
		this.parent = task;
		this.input = input;
	},
	
	inputChanged: function(value) {
		this.input.content = value;
		this.parent.updated();
	},
	
	removed: function() {
		this.parent.inputRemoved(this.input);
	}
});
