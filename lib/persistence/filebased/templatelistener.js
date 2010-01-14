/**
 * @author chubyqc
 */
tt.filebased.TemplateListener = new Class({
	
	Implements: tt.ITemplateListener,
	
	templates: null,
	
	template: null,
	
	initialize: function(templates, template) {
		this.templates = templates;
		this.template = template;
	},
	
	updated: function() {
		this.templates.updated();
	},
	
	nameChanged: function(name) {
		this.template.name = name;
		this.updated();
	},
	
	inputAdded: function(input) {
		var simpleInput = {
			uid: input.getUId(),
			label: input.getLabel(),
			history: []
		}
		this.template.inputs.push(simpleInput);
		input.addListener(new tt.filebased.TemplateInputListener(this, simpleInput));
		this.updated();
	},
	
	inputRemoved: function(input) {
		this.template.inputs.erase(input);
		this.updated();
	},
	
	removed: function() {
		this.templates.templateRemoved(this.template);
	}
});
