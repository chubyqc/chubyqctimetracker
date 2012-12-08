/**
 * @author chubyqc
 */
tt.TaskInput = new Class({
	
	Extends: tt.Element,
	
	Implements: [tt.IHasListeners, tt.ITemplateInputListener],
	
	label: null,
	
	taskInput: null,
	
	templateInput: null,
	
	task: null,
	
	/**
	 * @param {Object} options
	 * {
	 * 		element,
	 * 		templateInput,
	 * 		task
	 * }
	 */
	initialize: function(options) {
		tt.apply(options, this);
		this.parent(this.element);
		this.templateInput.addListener(this);
		this.label = tt.getElementById(this.element, 'div', 'htmlTemplatesTaskInputLabel');
		this.inputChanged(this.templateInput.getLabel());
		this.createTaskInputHandler();
	},
	
	createTaskInputHandler: function() {
		var me = this;
		this.taskInput = tt.getElementById(this.element, 'textarea', 'htmlTemplatesTaskInputText');
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
	
	getSnapshot: function() {
		return {
			label: this.templateInput.getLabel(),
			value: this.taskInput.value
		};
	},
	
	inputChanged: function(inputContent) {
		this.label.innerHTML = inputContent;
	},
	
	removed: function() {
		this.element.dispose();
		this.task.inputRemoved(this);
		this.informListeners(function(listener) {
			listener.removed();
		});
	},
	
	resized: function(size) {
		this.taskInput.style.width = size.x;
		this.taskInput.style.height = size.y;
	},
	
	setHistorySelect: function(select) {
		this.element.appendChild(select);
		var size = this.taskInput.getSize();
		select.setPosition({x: 0, y: -size.y});
		select.style.width = size.x + 20;
		select.style.height = size.y;
		this.element.style.height = size.y;
	},
	
	historyAdded: function() {}
});
