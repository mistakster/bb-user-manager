var App = {};

(function () {

	var sync = Backbone.sync;

	Backbone.sync = function (method) {
		console.log("sync: ", arguments);
		sync.apply(this, arguments);
	};

}());


(function () {

	App.wrapInPromise = function (ctx, fn, hash) {
		var dfd, promise, out;

		dfd = $.Deferred();
		promise = dfd.promise();
		out = fn.call(ctx, hash, {
			wait: true,
			success: function () {
				dfd.resolveWith(promise, [out]);
			},
			error: function () {
				dfd.rejectWith(promise, [out]);
			}
		});

		return promise;
	}

}());