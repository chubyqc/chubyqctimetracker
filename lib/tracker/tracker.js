/**
 * @author chubyqc
 */

tt.Tracker = new Class({
    
    Extends: tt.AbstractState,
	
	Implements: tt.IHasListeners,
	
	tasksList: null,
	
	tasks: [],
	
	runningTaskCount: 0,
	
	total: null,
	totalInFractionalHours: null,
	totalInHours: null,
	
	tabsContainer: null,
	
	currentTasksContainer: null,
	todoTasksContainer: null,
	concurrentTasksCount: 0,
	
	tabPanel: null,
	previousTimesManager: null,
    
    goal: null,
    
    initialize: function(element, timeTracker) {
        this.parent(element);
		this.total = $('trackerTotal');
		this.totalInFractionalHours = $('trackerTotalInFractionalHours');
		this.totalInHours = $('trackerTotalInHours');
		this.tabsContainer = $('tabsContainer');
		this.currentTasksContainer = $('currentTasksContainer');
		this.todoTasksContainer = $('todoTasksContainer');
		
		this.tabPanel = tt.htmlTemplates.factories.TabPanel.create({
			tracker: this,
			persistence: timeTracker.trackerPersistence
		});
		this.tabPanel.appendTo(this.tabsContainer);
        
        this.goal = new tt.Goal(this);
        
        var previousTimesManagerOptions = timeTracker.getPreviousTimesManagerOptions();
        this.previousTimesManager = new tt.PreviousTimeManager(this
        		, previousTimesManagerOptions.previousTimeSelect
        		, previousTimesManagerOptions.startNewTime);
    },
	
	setConcurrentTasksCount: function(value) {
		this.concurrentTasksCount = value;
		this.respectTasksConcurrency();
	},
	
	respectTasksConcurrency: function(newTask) {
		if (this.concurrentTasksCount == 0) {
			return;
		}
		while (this.runningTaskCount + 1 > this.concurrentTasksCount) {
			this.stopATask(newTask);
		}
	},
	
	stopATask: function(newTask) {
		for (var i = 0; i < this.tasks.length; ++i) {
			var task = this.tasks[i];
			if (task != newTask && task.isRunning) {
				task.stop();
				break;
			}
		}
	},
	
	resized: function(width, height) {
		height -= this.tabsContainer.getPosition().y + this.total.getSize().y;
		
		this.tabsContainer.style.height = height;
		
		this.currentTasksContainer.style.width = width / 2;
		this.currentTasksContainer.style.height = (height - 80) / 3;
        
		this.todoTasksContainer.style.width = width / 2;
		this.todoTasksContainer.style.height = (height - 80) / 1.5;
		
		this.tabPanel.resized(width, height);
	},
	
	taskAdded: function(task) {
		this.tasks.push(task);
	},
	
	taskRemoved: function(task) {
		this.tasks.erase(task);
		this.informListeners(function(listener) {
			listener.taskRemoved(task);
		});
		this.computeTotal();
	},
    
    resetTime: function() {
        this.tabPanel.resetTime();
        this.computeTotal();
    },
	
	getRunningTaskCount: function() {
		return this.runningTaskCount;
	},
	
	taskStarted: function(task) {
		task.appendTo(this.currentTasksContainer);
		this.respectTasksConcurrency(task);
		++this.runningTaskCount;
	},
    
    taskTodoStatusChanged: function(task, isTodo) {
        if (isTodo && !task.isRunning) {
            task.appendTo(this.todoTasksContainer);
        }
    },
	
	taskStopped: function(task, isTodo) {
		--this.runningTaskCount;
        this.taskTodoStatusChanged(task, isTodo);
	},
	
	getSum: function() {
		var sum = 0;
		for (var i = 0; i < this.tasks.length; ++i) {
			sum += this.tasks[i].getTimeElapsed();
		}
		return sum;
	},
	
	computeTotal: function() {
		var sum = this.getSum();
		this.total.innerHTML = tt.formatTime(sum);
        this.totalInFractionalHours.innerHTML = tt.formatTimeInFractionalHours(sum);
        this.totalInHours.innerHTML = tt.formatTimeInHours(sum);
        
        this.goal.computeGoal(sum);
	},
    
    getTotal: function() {
        return this.getSum();
    },
    
    getSnapshot: function() {
    	var snapshot = [];
    	for (var i = 0; i < this.tasks.length; ++i) {
			snapshot.push(this.tasks[i].getSnapshot());
		}
    	return snapshot;
    }
});
