/**
 * @author chubyqc
 */
tt.HTMLTemplates = new Class({
	
	templates: {},
	
	factories: {},
	
	initialize: function(templates) {
		var children = templates.childNodes;
		for (var id in children) {
			var element = children[id];
			if (element.nodeName == 'DIV') {
				this.createFactory(element);
			}
		}
	},
	
	createFactory: function(element) {
		var name = element.id.substring(tt.TEMPLATE_PREFIX.length);
		var obj = tt[name];
		var factory = new Class({
			
			Extends: tt.HTMLTemplate,
			
			initialize: function(element) {
				this.parent(element);
			},
			
			create: function(options) {
				options.element = this.parent();
				return new obj(options);
			}
		});
		this.factories[name] = new factory(element);
	}
});
