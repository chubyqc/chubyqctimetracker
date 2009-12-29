/**
 * @author chubyqc
 */
tt.Task = new Class({
	
	Extends: tt.HTMLTemplate,
	
	template: null,
	
	initialize: function(template) {
		this.template = template;
	}
});
