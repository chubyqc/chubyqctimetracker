/**
 * @author chubyqc
 */
tt.filebased.TemplateInputListener = new Class({
	
	Implements: tt.ITemplateInputListener,
	
	template: null,
	
	input: null,
	
	initialize: function(template, input) {
		this.template = template;
		this.input = input;
	},
	
	inputChanged: function(inputContent) {
		this.input.label = inputContent;
		this.template.updated();
	},
	
	historyAdded: function(value) {
		this.input.history.push(value);
		this.template.updated();
	},
	
	removed: function() {
		this.template.inputRemoved(this.input);
		this.template.updated();
	},
	
	resized: function(size) {
		this.input.size = size;
	}
});
