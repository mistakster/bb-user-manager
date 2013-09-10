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

	users.fetch();
	groups.fetch();

	var rels = new App.UserGroupRelations();
	rels.setUsersAndGroups(users, groups);

	rels.fetch();

	groups.on("selected", function (group, val) {
		if (!val) {
			return;
		}

		var groupUsers = rels.findUsersInGroup(group);

		_.chain(users.models).difference(groupUsers).forEach(function (user) {
			user.set("isReadyToAdd", true);
		})
	});

}(jQuery, Backbone));