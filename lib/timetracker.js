/**
 * @author chubyqc
 */
tt.TimeTracker = new Class({
	
	states: {},
	
	menu: null,
	
	trackerPersistence: null,
	
	templatesPersistence: null,
	
	stateCreators: {
		tracker: function(element, timetracker) {
			var tracker = new tt.Tracker(element, timetracker);
			tracker.addListener(timetracker.trackerPersistence);
			return tracker;
		},
		templates: function(element, timetracker) {
			var templates = new tt.Templates(element, timetracker.states.tracker);
			templates.addListener(timetracker.templatesPersistence);
			templates.addListener(timetracker.states.tracker);
			return templates;
		}
	},
	
	initialize: function(menu, states, htmlTemplates) {
		this.menu = menu;
		this.trackerPersistence = new tt.filebased.TrackerListener();
		this.templatesPersistence = new tt.filebased.TemplatesListener();
		menu.addHandlers(this);
		tt.htmlTemplates = new tt.HTMLTemplates(htmlTemplates);
		this.createStates(states);
		
		this.showTracker();
		
		new tt.filebased.Loader().load(this.states.tracker, this.states.templates);
		
		this.addShutdownHook();
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
	},
	
	addShutdownHook: function() {
		var me = this;
		window.nativeWindow.addEventListener(air.Event.CLOSING, function() {
			me.templatesPersistence.persist();
			me.trackerPersistence.persist();
		});
	}
});
