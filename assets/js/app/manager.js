(function ($, Backbone) {


	var users = new App.Users({
		model: App.User
	});

	users.on("all", function () {
		console.log(arguments);
	});

	var usersView = new App.UsersView({
		collection: users,
		el: $(".js-user-panel")
	});



}(jQuery, Backbone));