/**
 * @author chubyqc
 */
tt.Template = new Class({
	
	element: null,
	
	inputsList: null,
	
	initialize: function(element) {
		this.element = element;
		this.inputsList = tt.getElementById(element, 'tr', 'htmlTemplatesTemplateInputs');
	},
	
	appendTo: function(templates) {
		templates.appendChild(this.element);
	},
	
	add: function(input) {
		this.inputsList.appendChild(input);
	}
});
