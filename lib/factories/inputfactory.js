/**
 * @author chubyqc
 */
tt.InputFactory = new Class({
	
	Extends: tt.HTMLTemplate,
	
	initialize: function(element) {
		this.parent(element);
	},
	
	create: function(templateInput, task) {
		return new tt.TaskInput(this.parent(), templateInput, task);
	}
});
