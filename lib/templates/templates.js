/**
 * @author chubyqc
 */
tt.Templates = new Class({
	
	Extends: tt.AbstractState,
	
	newButton: null,
	
	templateList: null,
	
	initialize: function(element, timetracker) {
		this.parent(element, timetracker);
		this.tracker = tracker;
		this.newButton = $('templatesNew');
		this.templateList = $('templatesList');
		this.createNewHandler();
	},
	
	nameChanged: function(template) {
		this.timetracker.templateNameChanged(template);
	},
	
	newTemplate: function() {
		var template = tt.htmlTemplates.factories.htmlTemplatesTemplate.create(this);
		template.appendTo(this.templateList);
		template.add();
		this.timetracker.templateAdded(template);
	},
	
	remove: function(template) {
		this.timetracker.templateRemoved(template);
	},
	
	createNewHandler: function() {
		var me = this;
		this.newButton.onclick = function() {
			me.newTemplate();
		}
	}
});
