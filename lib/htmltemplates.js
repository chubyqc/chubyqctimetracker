/**
 * @author chubyqc
 */
tt.HTMLTemplates = new Class({
	
	templates: {},
	
	initialize: function(templates) {
		for (var id in htmlTemplates) {
			this.templates[id] = new tt.HTMLTemplate(htmlTemplates[id]);
		}
	}
});
