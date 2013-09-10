(function ($, Backbone) {

	App.Users = App.Panel.extend({
		model: App.User,
		localStorage: new Backbone.LocalStorage("Users")
	});

	App.UsersView = App.PanelView.extend({
		itemView: App.UserView
	});

}(jQuery, Backbone));