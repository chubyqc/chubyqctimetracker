/**
 * @author chubyqc
 */
tt.CHOOSER_PREFIX = 'chooser';

tt.Tracker = new Class({
    
    Extends: tt.AbstractState,
    
    chooser: null,
	
	template: null,
	
	tasksList: null,
	
	tasks: [],
	
	templates: {},
	
	runningTaskCount: 0,
    
    initialize: function(element, timetracker){
        this.parent(element, timetracker);
		this.tasksList = $('trackerList');
		this.createChooserHandler();
		this.createNewTaskHandler();
    },
	
	createNewTaskHandler: function() {
		var me = this;
		this.newTaskButton = $('newTaskButton');
		this.newTaskButton.onclick = function() {
			me.newTask();
		}
	},
	
	newTask: function() {
		if (this.template != null) {
			var task = tt.htmlTemplates.factories.htmlTemplatesTask.create(this.template,
				this);
			this.tasks.push(task);
			task.appendTo(this.tasksList);
		}
	},
	
	taskRemoved: function(task) {
		this.tasks.erase(task);
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
        this.chooser.getElementById(tt.CHOOSER_PREFIX + template.getUID()).dispose();
    },
    
    templateAdded: function(template){
        var option = this.chooser.appendChild(new Element('option'));
        option.id = tt.CHOOSER_PREFIX + template.getUID();
		option.innerHTML = template.getName();
		this.templates[tt.CHOOSER_PREFIX + template.getUID()] = template;
    },
    
    templateNameChanged: function(template){
    	this.chooser.getElementById(tt.CHOOSER_PREFIX + template.getUID()).innerHTML =
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
	}
});
