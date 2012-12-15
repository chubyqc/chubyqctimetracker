tt.PreviousTimeManager = new Class({

	Implements: tt.IHasListeners,
	
	ROUNDING: 900000, // 15 minutes
	ROUNDING_BTN_TEXT: 'Toggle Rounding',
	ROUNDING_BTN_ON_TEXT: ' (On)',
	ROUNDING_BTN_OFF_TEXT: ' (Off)',
	
	tracker: null,
	previousTimesSelect: null, 
	startNewTime: null,
	previousSnapshots: null,
	previousTimesWindowContent: null,
	previousTimesWindowDeleteButton: null,
	previousTimesWindowCloseButton: null,
	previousTimesWindowToggleRoundingButton: null,
	previousTimesWindow: null,
	doRound: false,

	initialize: function(tracker, previousTimesSelect, startNewTime) {
		this.tracker = tracker;
		this.previousTimesSelect = previousTimeSelect; 
		this.startNewTime = startNewTime;
		this.initComponents();
		this.previousSnapshots = [];
		this.addHandlers();
    },
    
    initComponents: function() {
    	this.previousTimesWindow = $('previousTimesWindow');
    	this.previousTimesWindowContent = $('previousTimesWindowContent');
    	this.previousTimesWindowDeleteButton = $('previousTimesWindowDeleteButton');
    	this.previousTimesWindowCloseButton = $('previousTimesWindowCloseButton');
    	this.previousTimesWindowToggleRoundingButton = $('previousTimesWindowToggleRoundingButton');

    	this.previousTimesWindowDeleteButton.onclick = tt.cb(this, this.deleteCurrent);
    	this.previousTimesWindowCloseButton.onclick = tt.cb(this, this.close);
    	this.previousTimesWindowToggleRoundingButton.onclick = tt.cb(this, this.toggleRounding);
    },
    
    toggleRounding: function() {
    	this.doRound = !this.doRound;
    	this.previousTimesWindowToggleRoundingButton.innerHTML = this.ROUNDING_BTN_TEXT + 
    		((this.doRound) ? this.ROUNDING_BTN_ON_TEXT : this.ROUNDING_BTN_OFF_TEXT);
    	this.previousTimeSelected();
    },
    
    deleteCurrent: function() {
    	if (this.previousTimesSelect.selectedIndex > 1) {
    		if (confirm('Do you really want to remove this entry?')) {
    			var timedSnapshot = this.getSelectedTimedSnapshot();
    			this.previousSnapshots.splice(this.previousTimesSelect.selectedIndex - 2, 1);
    			var option = this.previousTimesSelect.options[this.previousTimesSelect.selectedIndex];
    			option.parentNode.removeChild(option);

    			this.previousTimesSelect.selectedIndex = 0;
    			this.informListeners(function(listener) {
    				listener.snapshotRemoved(timedSnapshot);
    			});
    			this.close();
    		}
    	}
    },
    
    close: function() {
    	this.previousTimesWindow.style.display = 'none';
    },
    
    show: function() {
    	this.previousTimesWindow.style.display = 'block';
    },
    
    addHandlers: function() {
    	this.previousTimesSelect.onchange = tt.cb(this, this.previousTimeSelected);
    	this.startNewTime.onclick = tt.cb(this, this.doStartNewTime);
    },
    
    getSelectedSnapshot: function() {
    	return this.getSelectedTimedSnapshot().snapshot;
    },
    
    getSelectedTimedSnapshot: function() {
    	var selectedIndex = this.previousTimesSelect.selectedIndex;
    	if (selectedIndex > 0) {
    		if (selectedIndex == 1) {
    			return {
    				snapshot: this.tracker.getSnapshot()
    			}
    		} else {
    			return this.previousSnapshots[selectedIndex - 2];
    		}
    	}
    	return {};
    },
    
    createContent: function(snapshot) {
    	var output = this.previousTimesSelect.options[this.previousTimesSelect.selectedIndex].innerHTML + '<br /><br />';
    	
    	var total = 0;
    	var rounding = this.doRound ? this.ROUNDING : 1;
    	
    	for (var i = 0; i < snapshot.length; ++i) {
    		var task = snapshot[i];
    		
    		output += 'Project: ' + task.projectName;
    		output += ' (';
    		var first = true;
    		for (var inputId in task.inputs) {
    			var input = task.inputs[inputId];
    			if (!first) {
    				output += ', ';
    			} else {
    				first = false;
    			}
    			output += input.label + ': ' + input.value;
    		}
    		var timeElapsed = Math.round(task.timeElapsed / rounding) * rounding;
    		output += '), Time Elapsed: ' + tt.formatTimeInHours(timeElapsed);
    		output += '<br />';
    		
    		total += timeElapsed;
    	}
    	
    	output += '<br />Total: ' + tt.formatTimeInHours(total);
    	
    	return output;
    },
    
    previousTimeSelected: function() {
    	var snapshot = this.getSelectedSnapshot();
    	if (!snapshot) {
    		return;
    	}
    	
    	this.previousTimesWindowContent.innerHTML = this.createContent(snapshot);
    	this.show();
    },
    
    doStartNewTime: function() {
    	var timedSnapshot = {
    		time: new Date().toString(),
    		snapshot: this.tracker.getSnapshot()
    	};
    	this.newSnapshot(timedSnapshot);
    	this.tracker.resetTime();
    },
    
    newSnapshot: function(timedSnapshot) {
    	this.previousSnapshots.push(timedSnapshot);
    	this.addToPreviousTimesSelect(timedSnapshot);
    	this.informListeners(function(listener) {
			listener.snapshotTaken(timedSnapshot);
		});
    },
    
    addToPreviousTimesSelect: function(timedSnapshot) {
    	var newOption = new Element('option', {
    	    html: timedSnapshot.time,
    	});
    	this.previousTimesSelect.appendChild(newOption);
    }
});