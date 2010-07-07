/**
 * @author chubyqc
 */
tt.Task = new Class({
	
	Extends: tt.Element,
	
	Implements: [tt.IHasListeners, tt.ITemplateListener],
	
	removeButton: null,
	
	tracker: null,
	
	taskInputs: null,
	
	inputs: {},
	
	taskTime: null,
	
	startButton: null,
	
	isRunning: false,
	
	lastUpdateTime: -1,
	
	timeElapsed: 0,
	
	templateUId: -1,
	
	tab: null,
	
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
		this.template.addListener(this);
		this.createRemoveButtonHandler();
		this.createStartButtonHandler();
		this.taskInputs = tt.getElementById(this.element, 'tr', 'htmlTemplatesTaskInputs');
		this.createTaskTimeHandler();
		this.templateUId = this.template.getUId();
	},
	
	applyProperties: function(simpleTask) {
		if (simpleTask != null) {
			this.uid = simpleTask.uid;
			this.timeElapsed = simpleTask.timeElapsed;
			this.updateTaskTimeValue();
			this.timeUpdated();
			for (var i = 0; i < simpleTask.inputs.length; ++i) {
				var input = simpleTask.inputs[i];
				this.inputs[input.templateInputUId].taskInputChanged(input.content);
			}
		}
	},
	
	createTaskTimeHandler: function() {
		var me = this;
		this.taskTime = tt.getElementById(this.element, 'input', 'htmlTemplatesTaskTime');
		this.taskTime.onchange = function() {
			if (!me.isRunning) {
				me.timeElapsed = parseInt(me.taskTime.value) * tt.TIME_UNIT;
				me.timeUpdated();
			}
		}
	},
	
	createStartButtonHandler: function() {
		var me = this;
		this.startButton = tt.getElementById(this.element, 'div', 'htmlTemplatesTaskStart');
		this.startButton.onclick = function() {
			if (me.isRunning) {
				me.stop();
			} else {
				me.start();
			}
		};
	},
	
	updateTaskTimeValue: function() {
		this.taskTime.value = tt.formatTime(this.timeElapsed);
	},
	
	updateTime: function() {
		this.timeElapsed += (new Date().getTime() - this.lastUpdateTime) / 
			this.tracker.getRunningTaskCount();
		this.updateTaskTimeValue();
		this.lastUpdateTime = new Date().getTime();
		this.timeUpdated();
	},
	
	timeUpdated: function() {
		var me = this;
		this.informListeners(function(listener) {
			listener.timeChanged(me.timeElapsed);
		});
		this.tracker.computeTotal();
	},
	
	start: function() {
		this.startButton.toggleClass('taskStarted');
		this.startButton.innerHTML = 'Stop';
		this.lastUpdateTime = new Date().getTime();
		this.tracker.taskStarted(this);
		this.isRunning = true;
		this.taskTime.readOnly = 'readonly';
		var me = this;
		var waitTime = tt.TIME_UNIT / 2;
		var loop = function() {
			if (me.isRunning) {
				me.updateTime();
				setTimeout(loop, waitTime);
			}
		};
		loop();
	},
	
	stop: function() {
		if (this.isRunning) {
			this.startButton.toggleClass('taskStarted');
			this.startButton.innerHTML = 'Start';
			this.isRunning = false;
			this.updateTime();
			this.tracker.taskStopped(this);
			this.tab.taskStopped(this);
			this.taskTime.readOnly = '';
		}
	},
	
	inputAdded: function(templateInput) {
		var td = this.taskInputs.appendChild(new Element('td'));
		var taskInput = tt.htmlTemplates.factories.TaskInput.create({
			templateInput: templateInput, 
			task: this
		});
		this.inputs[templateInput.getUId()] = taskInput;
		taskInput.appendTo(td);
		this.informListeners(function(listener) {
			listener.inputAdded(taskInput);
		});
	},
	
	createRemoveButtonHandler: function() {
		var me = this;
		this.removeButton = tt.getElementById(this.element, 'div', 'htmlTemplatesTaskDelete');
		this.removeButton.onclick = function() {
			me.removed();
		}
	},
	
	removed: function() {
		this.isRunning = false;
		this.element.dispose();
		this.tracker.taskRemoved(this);
		var me = this;
		this.informListeners(function(listener) {
			listener.removed();
		});
	},
	
	inputRemoved: function(input) {
		delete this.inputs[input.getUId()];
	},
	
	getTimeElapsed: function() {
		return this.timeElapsed;
	}
});
