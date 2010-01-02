/**
 * @author chubyqc
 */
var tt = {};

tt.Element = new Class({
	
	element: null,
	
	initialize: function(element) {
		this.element = element;
	},
	
	appendTo: function(parent) {
		parent.appendChild(this.element);
	}
});
