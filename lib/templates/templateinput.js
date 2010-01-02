/**
 * @author chubyqc
 */
tt.TemplateInput = new Class({
	
	Extends: tt.Element,
	
	select: null,
	
	input: null,
	
	removeButton: null,
	
	template: null,
	
	uid: -1,
	
	label: null,
	
	inputs: [],
	
	initialize: function(element, template) {
		this.parent(element);
		this.template = template;
		this.uid = tt.getUId();
		this.createInputHandler();
		this.createRemoveButtonHandler();
	},
	
	getUId: function() {
		return this.uid;
	},
	
	getLabel: function() {
		return this.label;
	},
	
	addInput: function(input) {
		this.inputs.push(input);
	},
	
	createInputHandler: function() {
		var me = this;
		this.input = tt.getElementById(this.element, 'input', 'htmlTemplatesTemplateInputText');
		this.input.onchange = function() {
			me.inputChanged();
		}
	},
	
	inputChanged: function() {
		this.label = this.input.value;
		for (var i = 0; i < this.inputs.length; ++i) {
			this.inputs[i].inputChanged(this);
		}
	},
	
	createRemoveButtonHandler: function() {
		var me = this;
		this.removeButton = tt.getElementById(this.element, 'div', 'htmlTemplatesTemplateInputText');
		this.removeButton.onclick = function() {
			me.remove();
		}
	},
	
	remove: function() {
		this.element.dispose();
		this.template.inputRemoved(this);
		for (var i = 0; i < this.inputs.length; ++i) {
			this.inputs[i].remove();
		}
	}
});
