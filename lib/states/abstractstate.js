/**
 * @author chubyqc
 */
tt.AbstractState = new Class({
	
	element: null,
	
	htmlTemplates: null,
	
	initialize: function(element, htmlTemplates) {
		this.element = element;
		this.htmlTemplates = htmlTemplates;
	},
	
	show: function() {
		this.element.style.visibility = 'visible';
	},
	
	hide: function() {
		this.element.style.visibility = 'hidden';
	}
});
