/**
 * @author chubyqc
 */
tt.TemplateFactory = new Class({
	
	Extends: tt.HTMLTemplate,
	
	initialize: function(element) {
		this.parent(element);
	},
	
	create: function() {
		return new tt.Template(this.parent());
	}
});
