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
    taskTimeInFractionalHours: null,
    taskTimeInHours: null,
	
	startButton: null,
	resetButton: null,
	todoButton: null,
    
    todoLabels: ['Todo',  'Done'],
    currentLabelId: 0,
	
	isRunning: false,
	
	lastUpdateTime: -1,
	
	timeElapsed: 0,
	
	templateUId: -1,
	
	tab: null,
    
    projectName: null,
	
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
		this.createResetButtonHandler();
		this.createTodoButtonHandler();
		this.taskInputs = tt.getElementById(this.element, 'tr', 'htmlTemplatesTaskInputs');
		this.taskTimeInFractionalHours = tt.getElementById(this.element, 'td', 'htmlTemplatesTaskTimeInFractionalHours');
		this.taskTimeInHours = tt.getElementById(this.element, 'td', 'htmlTemplatesTaskTimeInHours');
        this.projectName = tt.getElementById(this.element, 'div', 'htmlTemplatesTaskProjectName');
        this.projectName.style.display = 'none';
        this.projectName.innerHTML = this.tab.name;
		this.createTaskTimeHandler();
		this.templateUId = this.template.getUId();
	},
	
	applyProperties: function(simpleTask) {
		if (simpleTask != null) {
			this.uid = simpleTask.uid;
			this.timeElapsed = simpleTask.timeElapsed;
			this.updateTaskTimeValue();
			this.timeUpdated();
			this.currentLabelId = simpleTask.todo ? 0 : 1;
			this.toggleTodo();
			for (var i = 0; i < simpleTask.inputs.length; ++i) {
				var input = simpleTask.inputs[i];
				this.inputs[input.templateInputUId].taskInputChanged(input.content);
			}
		}
	},
	
	getSnapshot: function() {
		var inputs = {};
		for (var key in this.inputs) {
			inputs[key] = this.inputs[key].getSnapshot();
		}
		return {
			projectName: this.projectName.innerHTML,
			uid: this.uid,
			timeElapsed: this.getTimeElapsed(),
			inputs: inputs
		};
	},
    
    nameChanged: function(name) {
        this.projectName.innerHTML = 'Project: ' + name;
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
	
	createResetButtonHandler: function() {
		var me = this;
		this.resetButton = tt.getElementById(this.element, 'div', 'htmlTemplatesTaskReset');
		this.resetButton.onclick = function() {
			me.reset(true);
		};
	},
    
	createTodoButtonHandler: function() {
		var me = this;
		this.todoButton = tt.getElementById(this.element, 'div', 'htmlTemplatesTaskTodo');
		this.todoButton.onclick = function() {
            me.toggleTodo();
		}
	},
    
    isTodo: function() {
        return this.currentLabelId == 1;
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
	
	timeUpdated: function(dontCompute) {
		var me = this;
        this.taskTimeInFractionalHours.innerHTML = tt.formatTimeInFractionalHours(this.timeElapsed);
        this.taskTimeInHours.innerHTML = tt.formatTimeInHours(this.timeElapsed);
		this.informListeners(function(listener) {
			listener.timeChanged(me.timeElapsed);
		});
        if (!dontCompute) {
            this.tab.computeTotal();
            this.tracker.computeTotal();
        }
	},
    
    toggleTodo: function() {
        var isTodo = this.isTodo();
        var stopped = false;
        var wasRunning = this.isRunning;
        if (isTodo && this.isRunning) {
            this.stop();
            stopped = true;
        }
        isTodo = !isTodo;
        if (!isTodo) {
            this.tab.taskStopped(this);
        }
        else if (!wasRunning) {
            this.tracker.taskTodoStatusChanged(this, isTodo);
        }
        this.setProjectNameVisibility(isTodo);
        this.todoButton.innerHTML = this.todoLabels[this.currentLabelId = (this.currentLabelId + 1) % 2];
        this.informListeners(function(listener) {
			listener.todo(isTodo);
		});
    },
    
    setProjectNameVisibility: function(visible) {
        this.projectName.style.display = (visible) ? 'block' : 'none';
    },
	
	start: function() {
		this.startButton.toggleClass('taskStarted');
		this.startButton.innerHTML = 'Stop';
        this.setProjectNameVisibility(true);
		tt.hide(this.removeButton);
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
			tt.show(this.removeButton);
			this.isRunning = false;
			this.updateTime();
            
			this.tracker.taskStopped(this, this.isTodo());
            if (!this.isTodo()) {
                this.tab.taskStopped(this);
            	this.setProjectNameVisibility(false);
            }
			this.taskTime.readOnly = '';
		}
	},
    
    reset: function(compute) {
        this.stop();
        this.timeElapsed = 0;
        this.updateTaskTimeValue();
        this.timeUpdated(!compute);
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
		this.tab.taskRemoved(this);
		var me = this;
		this.informListeners(function(listener) {
			listener.removed();
		});
	},
	
	inputRemoved: function(input) {
		delete this.inputs[input.getUId()];
	},
	
	getTimeElapsed: function() {
		if (this.isRunning) {
			return this.timeElapsed + (new Date().getTime() - this.lastUpdateTime) / 
				this.tracker.getRunningTaskCount();
		}
		return this.timeElapsed;
	}
});
