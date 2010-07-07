/**
 * @author chubyqc
 */
tt.TemplateInput = new Class({
	
	Extends: tt.Element,
	
	Implements: tt.IHasListeners,
	
	select: null,
	
	input: null,
	
	removeButton: null,
	
	template: null,
	
	history: {},
	
	historySelect: null,
	
	taskInput: null,
	
	values: {},
	
	oldValues: {},
	
	/**
	 * @param {Object} options
	 * {
	 * 		element,
	 * 		template
	 * }
	 */
	initialize: function(options) {
		tt.apply(options, this);
		this.parent(this.element);
		this.createInputHandler();
		this.createRemoveButtonHandler();
//		this.createHistorySelectHandler();
	},
	
	applyProperties: function(simpleInput) {
		if (simpleInput != null) {
			this.history = simpleInput.history;
			this.input.value = simpleInput.label;
			this.inputChanged();
			this.input.style.width = simpleInput.size.x;
			this.input.style.height = simpleInput.size.y;
			this.resized();
			for (var i = 0; i < this.history.length; ++i) {
				this.setHistory(this.history[i]);
			}
		}
	},
	
	createHistorySelectHandler: function() {
		this.historySelect = new Element('select', {
			'class': 'historySelect'
		});
		var me = this;
		this.historySelect.onchange = function() {
			if (me.taskInput) {
				me.taskInput.taskInputChanged(
					me.historySelect.options[me.historySelect.selectedIndex].innerHTML);
			}
		}
	},
	
	getLabel: function() {
		return this.input.value;
	},
	
	getSize: function() {
		return this.input.getSize();
	},
	
	createInputHandler: function() {
		var me = this;
		this.input = tt.getElementById(this.element, 'input', 'htmlTemplatesTemplateInputText');
		this.input.onchange = function() {
			me.inputChanged();
		};
		this.makeResizable(this.input);
	},
	
	makeResizable: function(element) {
		var me = this;
		var resizeHandler = element.makeResizable({
			onComplete: function() {
				me.resized();
			}
		});
	},
	
	resized: function() {
		var me = this;
		this.informListeners(function(listener) {
			listener.resized(me.getSize());
			if (listener.setHistorySelect != null) {
				me.bindTaskInput(listener);
			}
		});
	},
	
	inputChanged: function() {
		var me = this;
		this.informListeners(function(listener) {
			listener.inputChanged(me.getLabel());
		});
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
		this.informListeners(function(listener) {
			listener.removed();
		});
	},
	
	setHistory: function(value) {
		if (!this.values[value]) {
			this.values[value] = true;
			var option = new Element('option');
			option.innerHTML = value;
//			this.historySelect.options[this.historySelect.options.length] = option;
			this.informListeners(function(listener) {
				listener.historyAdded(value);
			});
		}
	},
	
	bindTaskInput: function(taskInput) {
//		this.historySelect = this.historySelect.dispose();
//		this.taskInput = taskInput;
//		taskInput.setHistorySelect(this.historySelect);
	}
});
