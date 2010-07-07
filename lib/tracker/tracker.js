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
	
	tabsContainer: null,
	
	currentTasksContainer: null,
	
	tabPanel: null,
    
    initialize: function(element, timeTracker) {
        this.parent(element);
		this.total = $('trackerTotal');
		this.tabsContainer = $('tabsContainer');
		this.currentTasksContainer = $('currentTasksContainer');	 
		
		this.tabPanel = tt.htmlTemplates.factories.TabPanel.create({
			tracker: this,
			persistence: timeTracker.trackerPersistence
		});
		this.tabPanel.appendTo(this.tabsContainer);
    },
	
	resized: function(width, height) {
		this.tabsContainer.style.height = height - this.tabsContainer.getPosition().y - this.total.getSize().y;
	},
	
	taskRemoved: function(task) {
		this.tasks.erase(task);
		this.informListeners(function(listener) {
			listener.taskRemoved(task);
		});
		this.computeTotal();
	},
	
	getRunningTaskCount: function() {
		return this.runningTaskCount;
	},
	
	taskStarted: function(taskElement) {
		++this.runningTaskCount;
		this.moveToCurrentTasks(taskElement);
	},
	
	taskStopped: function(taskElement) {
		--this.runningTaskCount;
		this.moveToAllTasks(taskElement);
	},
	
	computeTotal: function() {
		var sum = 0;
		for (var i = 0; i < this.tasks.length; ++i) {
			sum += this.tasks[i].getTimeElapsed();
		}
		this.total.innerHTML = tt.formatTime(sum);
	},
	
	moveToCurrentTasks: function(taskElement) {
		this.currentTasksContainer.appendChild(taskElement);
	},
	
	moveToAllTasks: function(taskElement) {
		this.tasksListContainer.appendChild(taskElement);
	}
});
