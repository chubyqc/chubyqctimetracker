/**
 * @author chubyqc
 */
tt.TaskInput = new Class({
	
	Extends: tt.Element,
	
	label: null,
	
	taskInput: null,
	
	templateInput: null,
	
	initialize: function(element, templateInput) {
		this.parent(element);
		this.templateInput = templateInput;
		templateInput.addInput(this);
		this.label = tt.getElementById(element, 'div', 'htmlTemplatesInputLabel');
		this.inputChanged(templateInput);
		this.createTaskInputHandler();
	},
	
	createTaskInputHandler: function() {
		var me = this;
		this.taskInput = tt.getElementById(this.element, 'textarea', 'htmlTemplatesInputText');
		this.taskInput.onchange = function() {
			me.templateInput.setHistory(me.taskInput.value);
		}
		this.taskInput.onfocus = function() {
			me.templateInput.bindTaskInput(me);
		}
	},
	
	taskInputChanged: function(value) {
		this.taskInput.value = value;
	},
	
	inputChanged: function(templateInput) {
		this.label.innerHTML = templateInput.getLabel();
	},
	
	remove: function() {
		this.element.dispose();
	},
	
	setHistorySelect: function(select) {
		var position = this.taskInput.getPosition();
		select.style.position = 'absolute';
		select.style.left = position.x;
		select.style.top = position.y;
	}
});
