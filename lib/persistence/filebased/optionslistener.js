/**
 * @author chubyqc
 */
tt.filebased.OptionsListener = new Class({
	
	Extends: tt.filebased.TimedWriter,
	
	Implements: tt.IOptionsListener,
	
	options: {},
	
	initialize: function() {
		this.parent(tt.OPTIONS_JSON);
	},
	
	getFileContent: function() {
		return this.options;
	},
	
	optionChanged: function(id, value) {
        this.options[id] = value;
		this.updated();
	}
});
