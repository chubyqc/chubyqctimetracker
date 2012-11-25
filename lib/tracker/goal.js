tt.Goal = new Class({
    
    goalInput: null,
    
    goalRemainingMin: null,
    goalRemainingFractionalHours: null,
    goalRemainingHours: null,
    
    goalDoneTime: null,
    timeAmount: 0,
    
    tracker: null,

	initialize: function(tracker) {
        this.tracker = tracker;
        this.createGoalInputHandler();
        this.goalRemainingMin = $('goalRemainingMin');
        this.goalRemainingFractionalHours = $('goalRemainingFractionalHours');
        this.goalRemainingHours = $('goalRemainingHours');
        this.goalDoneTime = $('goalDoneTime');
        this.parseGoal(this.goalInput.value);
    },
    
    createGoalInputHandler: function() {
        var that = this;
        (this.goalInput = $('goalInput')).onchange = function() {
			that.parseGoal(this.value);
		}
    },
    
    parseGoal: function(goalStr) {
        this.timeAmount = 0;
        var hIndex = goalStr.indexOf('h');
        if (hIndex >= 0) {
            this.timeAmount = parseInt(goalStr.substring(0, hIndex)) * 60 + parseInt(goalStr.substr(hIndex + 1));
        } else {
            var pointIndex = goalStr.indexOf('.');
            if (pointIndex >= 0) {
                this.timeAmount = parseFloat(goalStr) * 60;
            } else {
                this.timeAmount = parseInt(goalStr);
            }
        }
        this.computeGoal();
    },
    
    computeGoal: function(sum) {
    	sum = sum || this.tracker.getTotal();
    	
    	var now = new Date().getTime();
        var remaining = Math.max(0, this.timeAmount * 60000 - sum);
        
        this.goalRemainingMin.innerHTML = tt.formatTime(remaining);
        this.goalRemainingFractionalHours.innerHTML = tt.formatTimeInFractionalHours(remaining);
        this.goalRemainingHours.innerHTML = tt.formatTimeInHours(remaining);
        
        this.goalDoneTime.innerHTML = new Date(now + remaining).toLocaleTimeString();
    }
});