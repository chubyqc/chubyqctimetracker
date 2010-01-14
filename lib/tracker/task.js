/**
 * @author chubyqc
 */
tt.Task = new Class({
	
	Extends: tt.Element,
	
	Implements: [tt.IHasListeners, tt.ITemplateListener],
	
	TIME_UNIT: 60000,
	
	removeButton: null,
	
	tracker: null,
	
	taskInputs: null,
	
	inputs: {},
	
	taskTime: null,
	
	startButton: null,
	
	stopButton: null,
	
	isRunning: false,
	
	lastUpdateTime: -1,
	
	timeElapsed: 0,
	
	templateUId: -1,
	
	initialize: function(element, template, tracker) {
		this.parent(element);
		this.tracker = tracker;
		template.addListener(this);
		this.createRemoveButtonHandler();
		this.createStartButtonHandler();
		this.createStopButtonHandler();
		this.taskInputs = tt.getElementById(element, 'tr', 'htmlTemplatesTaskInputs');
		this.createTaskTimeHandler();
		this.templateUId = template.getUId();
	},
	
	applyProperties: function(simpleTask) {
		if (simpleTask != null) {
			this.uid = simpleTask.uid;
			this.timeElapsed = simpleTask.timeElapsed;
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
				me.timeElapsed = parseInt(me.taskTime.value) * me.TIME_UNIT;
				me.timeUpdated();
			}
		}
	},
	
	createStartButtonHandler: function() {
		var me = this;
		this.startButton = tt.getElementById(this.element, 'div', 'htmlTemplatesTaskStart');
		this.startButton.onclick = function() {
			me.start();
		};
	},
	
	createStopButtonHandler: function() {
		var me = this;
		this.stopButton = tt.getElementById(this.element, 'div', 'htmlTemplatesTaskStop');
		this.stopButton.onclick = function() {
			me.stop();
		};
	},
	
	updateTime: function() {
		this.timeElapsed += (new Date().getTime() - this.lastUpdateTime) / 
			this.tracker.getRunningTaskCount();
		this.taskTime.value = (this.timeElapsed / this.TIME_UNIT).toFixed();
		this.lastUpdateTime = new Date().getTime();
		this.timeUpdated();
	},
	
	timeUpdated: function() {
		this.informListeners(function(listener) {
			listener.timeChanged();
		});
	},
	
	start: function() {
		this.lastUpdateTime = new Date().getTime();
		this.tracker.taskStarted();
		this.isRunning = true;
		this.taskTime.readOnly = 'readonly';
		var me = this;
		var waitTime = this.TIME_UNIT / 2;
		var loop = function() {
			if (me.isRunning) {
				me.updateTime();
				setTimeout(loop, waitTime);
			}
		};
		loop();
	},
	
	stop: function() {
		this.updateTime();
		this.tracker.taskStopped();
		this.isRunning = false;
		this.taskTime.readOnly = '';
	},
	
	inputAdded: function(templateInput) {
		var td = this.taskInputs.appendChild(new Element('td'));
		var taskInput = tt.htmlTemplates.factories.htmlTemplatesInput.create(templateInput,
			this.getUId());
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
	}
});
