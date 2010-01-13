/**
 * @author chubyqc
 */
tt.TaskFactory = new Class({
	
	Extends: tt.HTMLTemplate,
	
	initialize: function(element) {
		this.parent(element);
	},
	
	create: function(template, tracker, simpleTask) {
		return new tt.Task(this.parent(), template, tracker, simpleTask);
	}
});
