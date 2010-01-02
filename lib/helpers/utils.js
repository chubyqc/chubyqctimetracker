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
