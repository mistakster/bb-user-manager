(function (Backbone) {

	App.Users = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage("Users")
	});

	App.UsersView = Backbone.View.extend({

		initialize: function () {
			this.handleCollectionEvents();
			return this;
		},

		handleCollectionEvents: function () {
			var panel = this.$el;
			this.collection.on("add", function (model) {
				var view = new App.UserView({
					model: model
				});
				panel.append(view.$el);
			});

			this.collection.on("remove", function (model) {
				model.destroy();
			});

			this.collection.on("reset", function (collection) {

			});
		}


	});


}(Backbone));