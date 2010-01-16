/**
 * @author chubyqc
 */
tt.CHOOSER_PREFIX = 'chooser';

tt.Tracker = new Class({
    
    Extends: tt.AbstractState,
	
	Implements: tt.IHasListeners,
    
    chooser: null,
	
	template: null,
	
	tasksList: null,
	
	tasks: [],
	
	templates: {},
	
	runningTaskCount: 0,
	
	total: 0,
    
    initialize: function(element){
        this.parent(element);
		this.tasksList = $('trackerList');
		this.createChooserHandler();
		this.createNewTaskHandler();
		this.total = $('trackerTotal');
    },
	
	createNewTaskHandler: function() {
		var me = this;
		this.newTaskButton = $('newTaskButton');
		this.newTaskButton.onclick = function() {
			me.newTask();
		}
	},
	
	newTask: function(simpleTask) {
		var template = (simpleTask != null) ? simpleTask.template : this.template;
		if (template != null) {
			var task = tt.htmlTemplates.factories.htmlTemplatesTask.create(template, this);
			this.tasks.push(task);
			task.appendTo(this.tasksList);
			this.informListeners(function(listener) {
				listener.taskAdded(task);
			});
			template.printInputs(task);
			task.applyProperties(simpleTask);
		}
	},
	
	taskRemoved: function(task) {
		this.tasks.erase(task);
		this.informListeners(function(listener) {
			listener.taskRemoved(task);
		});
		this.computeTotal();
	},
	
	createChooserHandler: function() {
		var me = this;
        this.chooser = $('templateChooser');
		this.chooser.onchange = function() {
			me.chooserChanged();
		}
	},
	
	chooserChanged: function() {
		var selectedIndex = this.chooser.selectedIndex;
		this.template = (selectedIndex == 0) ?
			null : this.templates[this.chooser.options[selectedIndex].id];
	},
    
    templateRemoved: function(template){
        this.chooser.getElementById(tt.CHOOSER_PREFIX + template.getUId()).dispose();
    },
    
    templateAdded: function(template){
        var option = this.chooser.appendChild(new Element('option'));
        option.id = tt.CHOOSER_PREFIX + template.getUId();
		option.innerHTML = template.getName();
		this.templates[tt.CHOOSER_PREFIX + template.getUId()] = template;
    },
    
    templateNameChanged: function(template){
    	this.chooser.getElementById(tt.CHOOSER_PREFIX + template.getUId()).innerHTML =
			template.getName();
    },
	
	getRunningTaskCount: function() {
		return this.runningTaskCount;
	},
	
	taskStarted: function() {
		++this.runningTaskCount;
	},
	
	taskStopped: function() {
		--this.runningTaskCount;
	},
	
	computeTotal: function() {
		var total = 0;
		for (var i = 0; i < this.tasks.length; ++i) {
			total += this.tasks[i].getTimeElapsed();
		}
		this.total.innerHTML = tt.formatTime(total);
	}
});
