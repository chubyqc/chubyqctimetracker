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

tt.TRACKER_JSON = "tracker.json";

tt.TEMPLATES_JSON = "templates.json";
