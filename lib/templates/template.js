/**
 * @author chubyqc
 */
tt.Template = new Class({
	
	Extends: tt.Element,
	
	Implements: tt.IHasListeners,
	
	WAIT_TIME: 30000,
	
	inputsList: null,
	
	addButton: null,
	
	removeButton: null,
	
	templateInputs: [],
	
	templates: null,
	
	nameInput: null,
	
	initialize: function(element, templates) {
		this.parent(element);
		this.templates = templates;
		this.inputsList = tt.getElementById(element, 'tr', 'htmlTemplatesTemplateInputs');
		this.createNameHandler();
		this.createAddButtonHandler();
		this.createRemoveButtonHandler();
	},
	
	applyProperties: function(simpleTemplate) {
		if (simpleTemplate == null) {
			this.add();
		} else {
			this.nameInput.value = simpleTemplate.name;
			this.nameChanged();
			for (var i = 0; i < simpleTemplate.inputs.length; ++i) {
				this.add(simpleTemplate.inputs[i]);
			}
		}
	},
	
	printInputs: function(listener) {
		for (var i = 0; i < this.templateInputs.length; ++i) {
			listener.inputAdded(this.templateInputs[i]);
		}
	},
	
	getName: function() {
		return this.nameInput.value;
	},
	
	createNameHandler: function() {
		var me = this;
		this.nameInput = tt.getElementById(this.element, 'input', 'htmlTemplatesTemplateName');
		this.nameInput.onchange = function() {
			me.nameChanged();
		}
	},
	
	nameChanged: function() {
		var me = this;
		this.templates.templateNameChanged(this);
		this.informListeners(function(listener) {
			listener.nameChanged(me.nameInput.value);
		});
	},
	
	createRemoveButtonHandler: function() {
		var me = this;
		this.removeButton = tt.getElementById(this.element, 'div', 'htmlTemplatesTemplateRemove');
		this.removeButton.onclick = function() {
			me.remove();
		}
	},
	
	createAddButtonHandler: function() {
		var me = this;
		this.addButton = tt.getElementById(this.element, 'div', 'htmlTemplatesTemplateAdd');
		this.addButton.onclick = function() {
			me.add();
		}
	},
	
	appendTo: function(templates) {
		templates.appendChild(this.element);
	},
	
	add: function(simpleInput) {
		var element = this.inputsList.appendChild(new Element('td'));
		var templateInput = tt.htmlTemplates.factories.htmlTemplatesTemplateInput.create(this);
		if (simpleInput != null) {
			templateInput.uid = simpleInput.uid;
		}
		this.templateInputs.push(templateInput);
		templateInput.appendTo(element);
		this.informListeners(function(listener) {
			listener.inputAdded(templateInput);
		});
		templateInput.applyProperties(simpleInput);
	},
	
	remove: function() {
		this.element.dispose();
		this.templates.remove(this);
		this.informListeners(function(listener) {
			listener.removed();
		});
	},
	
	inputRemoved: function(input) {
		this.templateInputs.erase(input);
	}
});
