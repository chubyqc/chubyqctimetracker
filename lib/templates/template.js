/**
 * @author chubyqc
 */
tt.Template = new Class({
	
	Extends: tt.Element,
	
	inputsList: null,
	
	addButton: null,
	
	removeButton: null,
	
	templateInputs: [],
	
	templates: null,
	
	nameInput: null,
	
	uid: -1,
	
	tasks: [],
	
	initialize: function(element, templates) {
		this.parent(element);
		this.templates = templates;
		this.uid = tt.getUId();
		this.inputsList = tt.getElementById(element, 'tr', 'htmlTemplatesTemplateInputs');
		this.createNameHandler();
		this.createAddButtonHandler();
		this.createRemoveButtonHandler();
	},
	
	printInputs: function(task) {
		for (var i = 0; i < this.templateInputs.length; ++i) {
			task.printInput(this.templateInputs[i]);
		}
	},
	
	addTask: function(task) {
		this.tasks.push(task);
	},
	
	getName: function() {
		return this.nameInput.value;
	},
	
	getUID: function() {
		return this.uid;
	},
	
	createNameHandler: function() {
		var me = this;
		this.nameInput = tt.getElementById(this.element, 'input', 'htmlTemplatesTemplateName');
		this.nameInput.onchange = function() {
			me.nameChanged();
		}
	},
	
	nameChanged: function() {
		this.templates.nameChanged(this);
		for (var i = 0; i < this.tasks.length; ++i) {
			this.tasks[i].nameChanged();
		}
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
	
	add: function() {
		var element = this.inputsList.appendChild(new Element('td'));
		var templateInput = tt.htmlTemplates.factories.htmlTemplatesTemplateInput.create(
			this);
		this.templateInputs.push(templateInput);
		templateInput.appendTo(element);
		for (var i = 0; i < this.tasks.length; ++i) {
			this.tasks[i].printInput(templateInput);
		}
	},
	
	remove: function() {
		this.element.dispose();
		this.templates.remove(this);
		for (var i = 0; i < this.tasks.length; ++i) {
			this.tasks[i].remove();
		}
	},
	
	inputRemoved: function(input) {
		this.templateInputs.erase(input);
	}
});
