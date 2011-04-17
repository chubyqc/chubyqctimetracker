/**
 * @author chubyqc
 */

tt.Tracker = new Class({
    
    Extends: tt.AbstractState,
	
	Implements: tt.IHasListeners,
	
	tasksList: null,
	
	tasks: [],
	
	runningTaskCount: 0,
	
    sum: 0,
	total: null,
	totalInFractionalHours: null,
	totalInHours: null,
	
	tabsContainer: null,
	
	currentTasksContainer: null,
	todoTasksContainer: null,
	
	tabPanel: null,
    
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
		++this.runningTaskCount;
		task.appendTo(this.currentTasksContainer);
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
	
	computeTotal: function() {
		this.sum = 0;
		for (var i = 0; i < this.tasks.length; ++i) {
			this.sum += this.tasks[i].getTimeElapsed();
		}
		this.total.innerHTML = tt.formatTime(this.sum);
        this.totalInFractionalHours.innerHTML = tt.formatTimeInFractionalHours(this.sum);
        this.totalInHours.innerHTML = tt.formatTimeInHours(this.sum);
        
        this.goal.computeGoal();
	},
    
    getTotal: function() {
        return this.sum;
    },
});
