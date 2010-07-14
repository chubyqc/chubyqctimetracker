/**
 * @author chubyqc
 */
tt.TabPanel = new Class({
	
	Extends: tt.Element,
	
	headers: null,
	
	templates: {},
	
	tabs: {},
	
	currentTab: null,
	
	initialize: function(options) {
		tt.apply(options, this);
		this.parent(this.element);
		this.headers = tt.getElementById(this.element, 'tr', 'htmlTemplatesTabPanelHeaders');
	},
	
	resized: function(width, height) {
		height -= this.headers.getSize().y;
		for (var key in this.tabs) {
			this.tabs[key].resized(width, height);
		}
	},
	
	createNewTaskHandler: function() {
		var that = this;
		var newTaskButton = tt.getElementById(this.element, 'tr', 'htmlTemplatesNewTaskButton');
		newTaskButton.onclick = function() {
			that.newTask();
		}
	},
	
	templateRemoved: function(template) {
		var tab = this.tabs[template.getUId()];
		var wasCurrent = tab == this.currentTab;
		delete this.tabs[template.getUId()];
		if (wasCurrent) {
			for (var key in this.tabs) {
				this.show(this.tabs[key]);
			}
		}
	},
    
    templateAdded: function(template){
		this.templates[template.getUId()] = template;
		this.addTab(template.getUId(), template);
    },
	
	addTab: function(id, template) {
		var tab = tt.htmlTemplates.factories.Tab.create({
			applyHeaderTo: this.headers,
			id: id,
			name: template.getName(),
			tabPanel: this,
			template: template,
			tracker: this.tracker
		});
		tab.appendTo(this.element);
		this.tabs[id] = tab;
		template.addListener(tab);
		tab.addListener(this.persistence);
		tab.addListener(this.tracker);
		if (this.currentTab == null) {
			this.show(tab);
		}
	},
	
	show: function(tab) {
		if (this.currentTab != tab) {
			if (this.currentTab != null) {
				this.currentTab.hide();
			}
			this.currentTab = tab;
			tab.show();
		}
	},
	
	newTask: function(simpleTask) {
		var template = simpleTask.template;
		if (template != null) {
			this.tabs[template.getUId()].newTask(simpleTask, template);
		}
	}
});
