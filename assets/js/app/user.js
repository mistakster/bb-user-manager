(function (Backbone) {

	App.User = Backbone.Model.extend({

	});

	App.UserView = Backbone.View.extend({

		tagName: "div",
		className: "list-group-item user-object",

		events: {
			"click .close": function () {
				var model = this.model;
				if (model.collection) {
					model.collection.remove(model);
				}
			}
		},

		initialize: function () {

			_.bindAll(this, "render", "remove");

			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "destroy", this.remove);

			this.render();

			return this;
		},

		render: function () {
			this.$el.attr("id", "user-" + this.model.id)
				.html(App.UserView.template({user: this.model.toJSON()}));
			return this;
		}

	}, {

		template: _.template('<button type="button" class="close">&times;</button><span class="user-object__name"><%= user.name %></span>')

	});


}(Backbone));