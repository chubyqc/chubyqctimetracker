tt.PreviousTimeManager = new Class({

	Implements: tt.IHasListeners,
	
	tracker: null,
	previousTimesSelect: null, 
	startNewTime: null,
	previousSnapshots: null,

	initialize: function(tracker, previousTimesSelect, startNewTime) {
		this.tracker = tracker;
		this.previousTimesSelect = previousTimeSelect; 
		this.startNewTime = startNewTime;
		this.previousSnapshots = [];
		this.addHandlers();
    },
    
    addHandlers: function() {
    	this.previousTimesSelect.onchange = tt.cb(this, this.previousTimeSelected);
    	this.startNewTime.onclick = tt.cb(this, this.doStartNewTime);
    },
    
    getSelectedSnapshot: function() {
    	var selectedIndex = this.previousTimesSelect.selectedIndex;
    	if (selectedIndex > 0) {
    		if (selectedIndex == 1) {
    			return this.tracker.getSnapshot();
    		} else {
    			return this.previousSnapshots[selectedIndex - 2].snapshot;
    		}
    	}
    	return null;
    },
    
    previousTimeSelected: function() {
    	var snapshot = this.getSelectedSnapshot();
    	if (!snapshot) {
    		return;
    	}
    	
    	var output = this.previousTimesSelect.options[this.previousTimesSelect.selectedIndex].innerHTML + '\n\n';
    	
    	var total = 0;
    	
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
    		output += '), Time Elapsed: ' + tt.formatTimeInHours(task.timeElapsed);
    		output += '\n';
    		
    		total += task.timeElapsed;
    	}
    	
    	output += '\nTotal: ' + tt.formatTimeInHours(total);
    	
    	alert(output);
    },
    
    doStartNewTime: function() {
    	var timedSnapshot = {
    		time: new Date().toString(),
    		snapshot: this.tracker.getSnapshot()
    	};
    	this.previousSnapshots.push(timedSnapshot);
    	this.addToPreviousTimesSelect(timedSnapshot);
    	this.tracker.resetTime();
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