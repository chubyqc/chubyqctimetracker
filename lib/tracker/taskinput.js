/**
 * @author chubyqc
 */
tt.TaskInput = new Class({
	
	Extends: tt.Element,
	
	label: null,
	
	initialize: function(element, templateInput) {
		this.parent(element);
		templateInput.addInput(this);
		this.label = tt.getElementById(element, 'div', 'htmlTemplatesInputLabel');
		this.inputChanged(templateInput);
	},
	
	inputChanged: function(templateInput) {
		this.label.innerHTML = templateInput.getLabel();
	},
	
	remove: function() {
		this.element.dispose();
	}
});
