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
		}
		this.taskInput.onfocus = function() {
			me.templateInput.bindTaskInput(me);
		}
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
	
	setHistorySelect: function(select) {
		var size = this.taskInput.getSize();
		size.x = -size.x - 5;
		size.y = -size.y + 18;
		select.setPosition(size);
		this.element.appendChild(select);
		select.style.width = this.taskInput.getSize().x + 20;
		select.style.height = this.taskInput.getSize().y;
	},
	
	historyAdded: function(value) {}
});
