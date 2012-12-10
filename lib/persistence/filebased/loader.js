/**
 * @author chubyqc
 */
tt.filebased.Loader = new Class({
	
	load: function(tracker, templates, options) {
		var simpleContent = this.loadFile(tt.TRACKER_JSON);
		var simpleTemplates = this.loadFile(tt.TEMPLATES_JSON);
        var simpleOptions = this.loadFile(tt.OPTIONS_JSON);
		var templatesMap = {};
		if (simpleTemplates != null) {
			for (var i = 0; i < simpleTemplates.length; ++i) {
				var template = simpleTemplates[i];
				templatesMap[template.uid] = template = templates.newTemplate(template);
			}
		}
		if (simpleContent != null) {
			this.loadTasks(simpleContent.tasks, templatesMap, tracker);
			this.loadPreviousTimes(simpleContent.previousTimes, tracker);
		}
        if (simpleOptions != null) {
            for (var key in simpleOptions) {
                options.optionChanged(key, simpleOptions[key]);
            }
        }
	},
	
	loadTasks: function(simpleTasks, templatesMap, tracker) {
		if (simpleTasks) {
			for (var i = 0; i < simpleTasks.length; ++i) {
				var simpleTask = simpleTasks[i];
				simpleTask.template = templatesMap[simpleTask.templateUId];
				tracker.tabPanel.newTask(simpleTask);
			}
		}
	},
	
	loadPreviousTimes: function(simplePreviousTimes, tracker) {
		if (simplePreviousTimes) {
			for (var i = 0; i < simplePreviousTimes.length; ++i) {
				var simplePreviousTime = simplePreviousTimes[i];
				tracker.previousTimesManager.newSnapshot(simplePreviousTime);
			}
		}
	},
	
	loadFile: function(filePath) {
		var storageFile = air.File.applicationStorageDirectory.resolvePath(filePath);
		if (!storageFile.exists) {
			return [];
		}
		var iStream = new air.FileStream();
		iStream.open(storageFile, air.FileMode.READ);
		if (iStream.bytesAvailable == 0) {
			return [];
		}
		var fileContent = iStream.readUTF();
		iStream.close();
		return JSON.decode(fileContent);
	}
});
