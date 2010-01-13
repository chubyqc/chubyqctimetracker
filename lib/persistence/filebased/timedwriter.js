/**
 * @author chubyqc
 */
tt.filebased = {};

tt.filebased.WAIT_TIME = 30000;

tt.filebased.TimedWriter = new Class({
	
	wasUpdated: false,
	
	storageFile: null,
	oStream: null,
	
	initialize: function(filePath, contentGetter) {
		this.storageFile = air.File.applicationStorageDirectory.resolvePath(filePath);
		this.oStream = new air.FileStream();
		this.contentGetter = contentGetter;
		this.startListening();
	},
	
	startListening: function() {
		var me = this;
		var loop = function() {
			me.persist();
			setTimeout(loop, tt.filebased.WAIT_TIME);
		}
		loop();
	},
	
	persist: function() {
		if (this.wasUpdated) {
			this.writeFile();
			this.wasUpdated = false;
		}
	},
	
	writeFile: function() {
		this.oStream.open(this.storageFile, air.FileMode.WRITE);
		var content = JSON.encode(this.getFileContent());
		this.oStream.writeUTF(content);
		this.oStream.close();
	},
	
	getFileContent: function() { tt.notImplemented('getFileContent'); },
	
	updated: function() {
		this.wasUpdated = true;
	}
});
