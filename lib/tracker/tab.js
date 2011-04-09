/**
 * @author chubyqc
 */
tt.Tab = new Class({
	
	Extends: tt.Element,
	
	Implements: [tt.IHasListeners, tt.ITemplateListener],
	
	headerCtn: null,
	headerName: null,
    headerTime: null,
	
	tasks: [],
	
	tasksList: null,
    
	total: null,
	totalInFractionalHours: null,
	totalInHours: null,
	
	newButtonArea: null,
	
	/**
	 * @param {Object} options
	 * {
	 * 		applyHeaderTo,
	 * 		id,
	 * 		name,
	 * 		tabPanel,
	 * 		template,
	 * 		tracker,
	 *      width,
	 *      height
	 * }
	 */
	initialize: function(options) {
		tt.apply(options, this);
		this.tasksList = tt.getElementById(this.element, 'div', 'htmlTemplatesTrackerList');
		this.total = tt.getElementById(this.element, 'td', 'htmlTemplatesTotal');
		this.totalInFractionalHours = tt.getElementById(this.element, 'td', 'htmlTemplatesTotalInFractionalHours');
		this.totalInHours = tt.getElementById(this.element, 'td', 'htmlTemplatesTotalInHours');
		this.newButtonArea = tt.getElementById(this.element, 'div', 'htmlTemplatesNewButtonArea');
		this.createHeader();
		this.createNewButtonHandler();
		this.createResetProjectTimeButtonHandler();
		this.hide();
        this.resized(this.width, this.height);
	},
	
	resized: function(width, height) {
		this.tasksList.style.width = width / 2;
		this.tasksList.style.height = height - 20;
	},
	
	createHeader: function() {
		var that = this;
		this.headerCtn = this.applyHeaderTo.appendChild(new Element('td')).appendChild(new Element('div', {
			'class': 'tabHeader',
			events: {
				click: function() {
					that.tabPanel.show(that);
				}
			}
		}));
        this.headerName = this.headerCtn.appendChild(new Element('div', {
            html: this.name
        }));
        this.headerTime = this.headerCtn.appendChild(new Element('div'));
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
            if (confirm('This will reset this task\'s computed time, continue?')) {
                that.resetTime();
            }
		}
	},
	
	nameChanged: function(name) {
		this.headerName.innerHTML = this.name = name;
	},

	inputAdded: function(templateInput) {},
	
	removed: function() {
		this.headerCtn.dispose();
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
    
    resetTime: function(dontTrackerCompute) {
        for (var i = 0; i < this.tasks.length; ++i) {
            this.tasks[i].reset();
        }
        this.computeTotal();
        if (!dontTrackerCompute) {
            this.tracker.computeTotal();
        }
    },
	
	taskStopped: function(task) {
		task.appendTo(this.tasksList);
	},
	
	hide: function() {
		this.headerCtn.removeClass('tabHeaderOn');
		tt.hide(this.element);
	},
	
	show: function() {
		this.headerCtn.addClass('tabHeaderOn');
		tt.show(this.element);
	},
	
	taskRemoved: function(task) {
		this.tasks.erase(task);
		this.computeTotal();
	},
    
    computeTotal: function() {
        var sum = 0;
		for (var i = 0; i < this.tasks.length; ++i) {
			sum += this.tasks[i].getTimeElapsed();
		}
		this.total.innerHTML = tt.formatTime(sum);
        this.totalInFractionalHours.innerHTML = tt.formatTimeInFractionalHours(sum);
        
        var inHours = tt.formatTimeInHours(sum);
        this.totalInHours.innerHTML = inHours;
        this.headerTime.innerHTML = (sum < 1) ? '' : inHours;
    }
});
