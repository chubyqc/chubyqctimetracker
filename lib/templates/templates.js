/**
 * @author chubyqc
 */
tt.Templates = new Class({
	
	Extends: tt.AbstractState,
	
	Implements: tt.IHasListeners,
	
	newButton: null,
	
	templateList: null,
	
	tracker: null,
	
	templateListContainer: null,
	
	initialize: function(element, tracker) {
		this.parent(element);
		this.tracker = tracker;
		this.newButton = $('templatesNew');
		this.templateList = $('templatesList');
		this.templateListContainer = $('templateListContainer');
		this.createNewHandler();
	},
	
	resized: function(width, height) {
		this.templateListContainer.style.height = height - this.templateListContainer.getPosition().y;
	},
	
	newTemplate: function(simpleTemplate) {
		var template = tt.htmlTemplates.factories.Template.create({
			templates: this
		});
		if (simpleTemplate != null) {
			template.uid = simpleTemplate.uid;
		}
		template.appendTo(this.templateList);
		this.informListeners(function(listener) {
			listener.templateAdded(template);
		});
		template.applyProperties(simpleTemplate);
		return template;
	},
	
	remove: function(template) {
		this.informListeners(function(listener) {
			listener.templateRemoved(template);
		});
	},
	
	createNewHandler: function() {
		var me = this;
		this.newButton.onclick = function() {
			me.newTemplate();
		}
	}
});
