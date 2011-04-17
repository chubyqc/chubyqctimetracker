/**
 * @author chubyqc
 */
tt.getElementById = function(root, tag, id) {
	var elements = root.getElements(tag);
	for (var i = 0; i < elements.length; ++i) {
		var element = elements[i];
		if (element.id == id) {
			return element;
		}
	}
	return null;
}

tt.getUId = function() {
	return new Date().getTime();
}

tt.getByUId = function(array, uid) {
	for (var i = 0; i < array.length; ++i) {
		if (array[i].uid == uid) {
			return array[i];
		}
	}
	return null;
},

tt.removeByUId = function(array, uid) {
	for (var i = 0; i < array.length; ++i) {
		if (array[i].uid == uid) {
			array.splice(i, 1);
			break;
		}
	}
},

tt.notImplemented = function(methodName) {
	alert(methodName + ' not implemented!');
}

tt.apply = function(from, to) {
	for (var key in from) {
		to[key] = from[key];
	}
}

tt.hide = function(element) {
	element.style.display = 'none';
}

tt.show = function(element) {
	element.style.display = '';
}
	
tt.TIME_UNIT = 60000;

tt.formatTime = function(time) {
	return (time / tt.TIME_UNIT).toFixed();
}

tt.formatTimeInHours = function(time) {
    var hours = parseInt(time / (tt.TIME_UNIT * 60));
    var remainingMinutes = ((time - hours * tt.TIME_UNIT * 60) / tt.TIME_UNIT).toFixed();
    if (remainingMinutes.length == 1) {
        remainingMinutes = '0' + remainingMinutes;
    }
	return hours.toFixed() + 'h' + remainingMinutes;
}

tt.formatTimeInFractionalHours = function(time) {
    return (time / (tt.TIME_UNIT * 60)).toFixed(2) + 'h';
}

tt.TRACKER_JSON = "tracker.json";

tt.TEMPLATES_JSON = "templates.json";

tt.OPTIONS_JSON = "options.json";

tt.TEMPLATE_PREFIX = 'htmlTemplates';
