/**
 * @author chubyqc
 */
tt.filebased.TemplatesListener = new Class({
	
	Extends: tt.filebased.TimedWriter,
	
	Implements: tt.ITemplatesListener,
	
	templates: [],
	
	initialize: function() {
		this.parent(tt.TEMPLATES_JSON);
	},
	
	getFileContent: function() {
		return this.templates;
	},
	
	templateAdded: function(template) {
		var simpleTemplate = {
			uid: template.getUId(),
			name: template.getName(),
			inputs: []
		};
		this.templates.push(simpleTemplate);
		template.addListener(new tt.filebased.TemplateListener(this, simpleTemplate,
			template.getUId()));
		this.updated();
	},
	
	templateRemoved: function(template) {
		this.templates.erase(template);
		this.updated();
	},
	
	templateNameChanged: function(template) {
		tt.getByUId(template.getUId).name = template.getName();
		this.updated();
	}
});
