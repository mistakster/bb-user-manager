(function ($, Backbone) {

	var users = new App.Users();

	var usersView = new App.UsersView({
		collection: users,
		el: $(".js-user-panel")
	});

	users.on("all", function () {
		console.log(arguments);
	});

	var groups = new App.Groups();

	var groupsView = new App.GroupsView({
		collection: groups,
		el: $(".js-group-panel")
	});

	groups.on("all", function () {
		console.log(arguments);
	});

}(jQuery, Backbone));