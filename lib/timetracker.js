/**
 * @author chubyqc
 */
tt.TimeTracker = new Class({
	
	states: {},
	
	menu: null,
	
	stateCreators: {
		tracker: function(element, timetracker) {
			return new tt.Tracker(element, timetracker);
		},
		templates: function(element, timetracker) {
			return new tt.Templates(element, timetracker);
		}
	},
	
	initialize: function(menu, states, htmlTemplates) {
		this.menu = menu;
		menu.addHandlers(this);
		tt.htmlTemplates = new tt.HTMLTemplates(htmlTemplates);
		this.createStates(states);
		
		this.showTracker();
	},
	
	templateAdded: function(template) {
		this.states.tracker.templateAdded(template);
	},
	
	templateRemoved: function(template) {
		this.states.tracker.templateRemoved(template);
	},
	
	templateNameChanged: function(template) {
		this.states.tracker.templateNameChanged(template);
	},
	
	templateInputChanged: function(template, templateInput) {
		this.states.tracker.templateInputChanged(template, templateInput);
	},
	
	createStates: function(states) {
		var children = states.childNodes;
		for (var id in children) {
			var element = children[id];
			if (element.nodeName == 'DIV') {
				this.states[element.id] = this.stateCreators[element.id](element, this);
			}
		}
	},
	
	showTemplates: function() {
		this.states.tracker.hide();
		this.states.templates.show();
	},
	
	showTracker: function() {
		this.states.templates.hide();
		this.states.tracker.show();
	}
});
