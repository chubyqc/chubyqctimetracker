/**
 * @author chubyqc
 */
tt.Tab = new Class({
	
	Extends: tt.Element,
	
	Implements: [tt.IHasListeners, tt.ITemplateListener],
	
	header: null,
	
	tasks: [],
	
	tasksList: null,
	
	newButtonArea: null,
	
	/**
	 * @param {Object} options
	 * {
	 * 		applyHeaderTo,
	 * 		id,
	 * 		name,
	 * 		tabPanel,
	 * 		template,
	 * 		tracker
	 * }
	 */
	initialize: function(options) {
		tt.apply(options, this);
		this.tasksList = tt.getElementById(this.element, 'div', 'htmlTemplatesTrackerList');
		this.newButtonArea = tt.getElementById(this.element, 'div', 'htmlTemplatesNewButtonArea');
		this.createHeader();
		this.createNewButtonHandler();
		this.createResetProjectTimeButtonHandler();
		this.hide();
	},
	
	resized: function(width, height) {
		this.tasksList.style.width = width / 2;
		this.tasksList.style.height = height - 20;
	},
	
	createHeader: function() {
		var that = this;
		this.header = this.applyHeaderTo.appendChild(new Element('td')).appendChild(new Element('div', {
			'class': 'tabHeader',
			html: this.name,
			events: {
				click: function() {
					that.tabPanel.show(that);
				}
			}
		}));
	},
	
	createNewButtonHandler: function() {
		var that = this;
		tt.getElementById(this.element, 'div', 'htmlTemplatesNewTaskButton').onclick = function() {
			that.newTask(null, that.template);
		}
	},
	
	createResetProjectTimeButtonHandler: function() {
		var that = this;
		tt.getElementById(this.element, 'div', 'htmlTemplatesResetProjectTimeTaskButton').onclick = function() {
			that.resetProjectTime();
		}
	},
	
	nameChanged: function(name) {
		this.header.innerHTML = name;
	},

	inputAdded: function(templateInput) {},
	
	removed: function() {
		this.header.dispose();
		this.element.dispose();
	},
	
	newTask: function(simpleTask, template) {
		var task = tt.htmlTemplates.factories.Task.create({
			template: template,
			tracker: this.tracker,
			tab: this
		});
		this.tasks.push(task);
		task.appendTo(this.tasksList);
		this.informListeners(function(listener) {
			listener.taskAdded(task);
		});
		template.printInputs(task);
		task.applyProperties(simpleTask);
	},
    
    resetProjectTime: function() {
        for (var i = 0; i < this.tasks.length; ++i) {
            this.tasks[i].reset();
        }
        this.tracker.computeTotal();
    },
	
	taskStopped: function(task) {
		task.appendTo(this.tasksList);
	},
	
	hide: function() {
		this.header.removeClass('tabHeaderOn');
		tt.hide(this.element);
	},
	
	show: function() {
		this.header.addClass('tabHeaderOn');
		tt.show(this.element);
	}
});
