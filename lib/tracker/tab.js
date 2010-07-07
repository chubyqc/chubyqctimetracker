/**
 * @author chubyqc
 */
tt.Tab = new Class({
	
	Extends: tt.Element,
	
	Implements: [tt.IHasListeners, tt.ITemplateListener],
	
	header: null,
	
	tasks: [],
	
	tasksList: null,
	
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
		this.createHeader();
		this.createNewButtonHandler();
		this.hide();
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
	
	nameChanged: function(name) {
		this.header.innerHTML = name;
	},

	inputAdded: function(templateInput) {
	},
	
	removed: function() {
		this.header.dispose();
		this.element.dispose();
	},
	
	newTask: function(simpleTask, template) {
		var task = tt.htmlTemplates.factories.Task.create({
			template: template,
			tracker: this.tracker
		});
		this.tasks.push(task);
		task.appendTo(this.tasksList);
		this.informListeners(function(listener) {
			listener.taskAdded(task);
		});
		template.printInputs(task);
		task.applyProperties(simpleTask);
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
