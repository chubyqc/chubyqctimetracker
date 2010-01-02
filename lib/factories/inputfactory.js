/**
 * @author chubyqc
 */
tt.InputFactory = new Class({
	
	Extends: tt.HTMLTemplate,
	
	initialize: function(element) {
		this.parent(element);
	},
	
	create: function(templateInput) {
		return new tt.TaskInput(this.parent(), templateInput);
	}
});
