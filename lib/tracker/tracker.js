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
		height -= this.tabsContainer.getPosition().y + this.total.getSize().y;
		
		this.tabsContainer.style.height = height;
		
		this.currentTasksContainer.style.width = width / 2;
		this.currentTasksContainer.style.height = height - 2;
		
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
	
	getRunningTaskCount: function() {
		return this.runningTaskCount;
	},
	
	taskStarted: function(task) {
		++this.runningTaskCount;
		task.appendTo(this.currentTasksContainer);
	},
	
	taskStopped: function(task) {
		--this.runningTaskCount;
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
	}
});
