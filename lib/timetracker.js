/**
 * @author chubyqc
 */
var tt = {};

tt.TimeTracker = new Class({
	
	states: {},
	
	htmlTemplates: null,
	
	menu: null,
	
	initialize: function(menu, states, htmlTemplates) {
		this.menu = menu;
		menu.addHandlers(menu);
		this.createStates(states);
		this.htmlTemplates = new tt.HTMLTemplates(htmlTemplates);
		
		this.showTracker();
	},
	
	createStates: function(states) {
		var children = states.childNodes;
		for (var id in children) {
			var element = children[id];
			if (element.nodeName == 'DIV') {
				this.states[element.id] = element;
			}
		}
	},
	
	showTemplates: function() {
		this.hide(this.state.tracker);
		this.show(this.states.templates);
		this.menu.templatesClicked();
	},
	
	showTracker: function() {
		this.hide(this.states.templates);
		this.show(this.states.tracker);
		this.menu.trackerClicked();
	},
	
	show: function(state) {
		state.style.visibility = 'visible';
	},
	
	hide: function(state) {
		state.style.visibility = 'hidden';
	}
});
