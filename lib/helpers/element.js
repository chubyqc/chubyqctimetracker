/**
 * @author chubyqc
 */
var tt = {};

tt.Element = new Class({
	
	element: null,
	
	uid: -1,
	
	initialize: function(element) {
		this.element = element;
		this.uid = tt.getUId(); 
	},
	
	getUId: function() {
		return this.uid;
	},
	
	appendTo: function(parent) {
		parent.appendChild(this.element);
	}
});
