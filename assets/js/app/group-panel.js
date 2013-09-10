(function ($, Backbone) {

	App.Groups = App.Panel.extend({
		model: App.Group,
		localStorage: new Backbone.LocalStorage("Groups"),

		initialize: function () {
			App.Panel.prototype.initialize.apply(this, arguments);

			this.on("selected", function (group, val) {
				if (val) {
					this.without(group).forEach(function (g) {
						g.setSelected(false);
					})
				}
			});
		}
	});

	App.GroupsView = App.PanelView.extend({
		itemView: App.GroupView,

		events: _.extend({



		}, App.PanelView.prototype.events)



	});

}(jQuery, Backbone));