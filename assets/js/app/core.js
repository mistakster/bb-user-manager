var App = {};

(function () {

	var sync = Backbone.sync;

	Backbone.sync = function (method) {
		console.log("sync: ", arguments);
		sync.apply(this, arguments);
	};

}());
