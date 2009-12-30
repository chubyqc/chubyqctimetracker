/**
 * @author chubyqc
 */
var tt = {};

tt.TimeTracker = new Class({
	
	states: {},
	
	htmlTemplates: null,
	
	menu: null,
	
	stateCreators: {
		tracker: function(element, htmlTemplates) {
			return new tt.Tracker(element, htmlTemplates);
		},
		templates: function(element, htmlTemplates) {
			return new tt.Templates(element, htmlTemplates);
		}
	},
	
	initialize: function(menu, states, htmlTemplates) {
		this.menu = menu;
		menu.addHandlers(this);
		this.htmlTemplates = new tt.HTMLTemplates(htmlTemplates);
		this.createStates(states);
		
		this.showTracker();
	},
	
	createStates: function(states) {
		var children = states.childNodes;
		for (var id in children) {
			var element = children[id];
			if (element.nodeName == 'DIV') {
				this.states[element.id] = this.stateCreators[element.id](element,
					this.htmlTemplates);
			}
		}
	},
	
	showTemplates: function() {
		this.states.tracker.hide();
		this.states.templates.show();
		this.menu.templatesClicked();
	},
	
	showTracker: function() {
		this.states.templates.hide();
		this.states.tracker.show();
		this.menu.trackerClicked();
	}
});
