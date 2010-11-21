/**
 * @author chubyqc
 */
tt.TimeTracker = new Class({
	
	states: {},
	
	menu: null,
	
	trackerPersistence: null,
	
	templatesPersistence: null,
	
	optionsPersistence: null,
	
	stateCreators: {
		tracker: function(element, timetracker) {
			var tracker = new tt.Tracker(element, timetracker);
			tracker.addListener(timetracker.trackerPersistence);
			return tracker;
		},
		templates: function(element, timetracker) {
			var templates = new tt.Templates(element, timetracker.states.tracker);
			templates.addListener(timetracker.templatesPersistence);
			templates.addListener(timetracker.states.tracker.tabPanel);
			return templates;
		},
		options: function(element, timetracker) {
			var options = new tt.Options(element, timetracker.states.options);
			options.addListener(timetracker.optionsPersistence);
			return options;
		}
	},
	
	initialize: function(menu, states, htmlTemplates) {
		this.menu = menu;
		this.trackerPersistence = new tt.filebased.TrackerListener();
		this.templatesPersistence = new tt.filebased.TemplatesListener();
		this.optionsPersistence = new tt.filebased.OptionsListener();
		menu.addHandlers(this);
		tt.htmlTemplates = new tt.HTMLTemplates(htmlTemplates);
		this.createStates(states);
		
		this.showTracker();
		
		this.initWindow();
		
		new tt.filebased.Loader().load(this.states.tracker, this.states.templates, this.states.options);
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
		this.states.options.hide();
		this.states.templates.show();
	},
	
	showTracker: function() {
		this.states.templates.hide();
		this.states.options.hide();
		this.states.tracker.show();
	},
	
	showOptions: function() {
		this.states.templates.hide();
		this.states.tracker.hide();
		this.states.options.show();
	},
    
    resetTime: function() {
        this.states.tracker.resetTime();
    },
	
	persist: function() {
		this.templatesPersistence.persist();
		this.trackerPersistence.persist();
		this.optionsPersistence.persist();
	},
	
	addShutdownHook: function() {
		var me = this;
		window.nativeWindow.addEventListener(air.Event.CLOSING, function() {
			me.persist();
		});
	},
	
	resized: function() {
		this.states.templates.resized(window.innerWidth, window.innerHeight);
		this.states.tracker.resized(window.innerWidth, window.innerHeight);
	},
	
	initWindow: function() {
		window.nativeWindow.width = air.Capabilities.screenResolutionX;
		window.nativeWindow.height = air.Capabilities.screenResolutionY / 3;
		window.nativeWindow.x = 0;
		window.nativeWindow.y = air.Capabilities.screenResolutionY - window.nativeWindow.height;
		window.nativeWindow.alwaysInFront = true;
		this.resized();
		this.addShutdownHook();
	}
});
