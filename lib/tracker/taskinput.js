/**
 * @author chubyqc
 */
tt.TaskInput = new Class({
	
	Extends: tt.Element,
	
	Implements: [tt.IHasListeners, tt.ITemplateInputListener],
	
	label: null,
	
	taskInput: null,
	
	templateInput: null,
	
	initialize: function(element, templateInput) {
		this.parent(element);
		this.templateInput = templateInput;
		templateInput.addListener(this);
		this.label = tt.getElementById(element, 'div', 'htmlTemplatesInputLabel');
		this.inputChanged(templateInput.getLabel());
		this.createTaskInputHandler();
	},
	
	createTaskInputHandler: function() {
		var me = this;
		this.taskInput = tt.getElementById(this.element, 'textarea', 'htmlTemplatesInputText');
		this.taskInput.onchange = function() {
			me.taskInputChanged(me.taskInput.value);
			me.templateInput.setHistory(me.taskInput.value);
		};
		this.taskInput.onfocus = function() {
			me.templateInput.bindTaskInput(me);
		};
		this.resized(this.templateInput.getSize());
	},
	
	taskInputChanged: function(value) {
		this.taskInput.value = value;
		this.informListeners(function(listener) {
			listener.inputChanged(value);
		});
	},
	
	inputChanged: function(inputContent) {
		this.label.innerHTML = inputContent;
	},
	
	removed: function() {
		this.element.dispose();
	},
	
	resized: function(size) {
		this.taskInput.style.width = size.x;
		this.taskInput.style.height = size.y;
	},
	
	setHistorySelect: function(select) {
		this.element.appendChild(select);
		var size = this.taskInput.getSize();
		select.setPosition({x: 2, y: -size.y - 2});
		select.style.width = size.x + 20;
		select.style.height = size.y;
	}
});
