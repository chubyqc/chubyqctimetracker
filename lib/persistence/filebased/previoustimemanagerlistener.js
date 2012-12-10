/**
 * @author chubyqc
 */
tt.filebased.PreviousTimeManagerListener = new Class({
	
	Implements: tt.IPreviousTimeManagerListener,
	
	parent: null,
	previousTimes: null,
	
	initialize: function(tracker) {
		this.parent = tracker;
		this.previousTimes = tracker.getPreviousTimes();
	},
	
	updated: function() {
		this.parent.updated();
	},
	
	snapshotTaken: function(timedSnapshot) { 
		this.previousTimes.push(timedSnapshot);
	},
	
	snapshotRemoved: function(timedSnapshot) { 
		for (var i = 0; i < this.previousTimes.length; ++i) {
			if (this.previousTimes[i].time == timedSnapshot.time) {
				this.previousTimes.splice(i, 1);
				return;
			}
		}
	}
});
