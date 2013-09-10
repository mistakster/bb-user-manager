(function ($, Backbone) {

	App.Groups = App.Panel.extend({
		model: App.Group,
		localStorage: new Backbone.LocalStorage("Groups")
	});

	App.GroupsView = App.PanelView.extend({
		itemView: App.GroupView
	});

}(jQuery, Backbone));