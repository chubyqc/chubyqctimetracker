/**
 * @author chubyqc
 */
tt.TemplateInputFactory = new Class({
	
	Extends: tt.HTMLTemplate,
	
	initialize: function(element) {
		this.parent(element);
	},
	
	create: function(template) {
		return new tt.TemplateInput(this.parent(), template);
	}
});
