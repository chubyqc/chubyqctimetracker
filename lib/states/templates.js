/**
 * @author chubyqc
 */
tt.Templates = new Class({
	
	Extends: tt.AbstractState,
	
	newButton: null,
	
	templateList: null,
	
	initialize: function(element, htmlTemplates) {
		this.parent(element, htmlTemplates);
		this.newButton = $('templatesNew');
		this.templateList = $('templatesList');
		this.createNewHandler();
	},
	
	newTemplate: function() {
		var template = this.htmlTemplates.factories.htmlTemplatesTemplate.create();
		template.appendTo(this.templateList);
		template.add(this.htmlTemplates.factories.htmlTemplatesTemplateInput.create());
	},
	
	createNewHandler: function() {
		var me = this;
		this.newButton.onclick = function() {
			me.newTemplate();
		}
	}
});
