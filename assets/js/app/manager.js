(function ($, Backbone) {


	var users = new App.Users({
		model: App.User
	});

	users.on("all", function () {
		console.log(arguments);
	});

	var usersView = new App.UsersView({
		collection: users,
		el: $(".js-user-list")
	});

	$(".js-new-user-form").on("submit", function (e) {
		e.preventDefault();

		var $input = $(this).find(".js-new-user-name");
		var name = $input.val();
		name = $.trim(name);

		if (name) {
			users.create({name: name}, {wait: true});
		}

		$input.val("");
	});


}(jQuery, Backbone));