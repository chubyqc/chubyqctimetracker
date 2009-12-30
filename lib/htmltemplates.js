/**
 * @author chubyqc
 */
tt.HTMLTemplates = new Class({
	
	templates: {},
	
	factories: {},
	
	creators: {
		htmlTemplatesTemplate: function(element) {
			return new tt.TemplateFactory(element);
		},
		htmlTemplatesTemplateInput: function(element) {
			return new tt.TemplateInputFactory(element);
		},
		htmlTemplatesInput: function(element) {
			return new tt.InputFactory(element);
		},
		htmlTemplatesTask: function(element) {
			return new tt.TaskFactory(element);
		}
	},
	
	initialize: function(templates) {
		var children = templates.childNodes;
		for (var id in children) {
			var element = children[id];
			if (element.nodeName == 'DIV') {
				this.factories[element.id] = this.creators[element.id](element);
			}
		}
		for (var id in htmlTemplates) {
			this.factories[id] = new tt.HTMLTemplate(htmlTemplates[id]);
		}
	}
});
