/**
 * @author chubyqc
 */
tt.HTMLTemplate = new Class({
	
	element: null,
	
	initialize: function(element) {
		this.element = element;
	},
	
	create: function() {
		return this.element.clone();
	}
});
