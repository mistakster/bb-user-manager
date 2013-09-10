(function (Backbone) {

	App.Group = Backbone.Model.extend({

	});

	App.GroupView = Backbone.View.extend({

		tagName: "div",
		className: "list-group-item group-object",

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
			this.$el.attr("id", "group-" + this.model.id)
				.html(App.GroupView.template({group: this.model.toJSON()}));
			return this;
		}

	}, {

		template: _.template('<button type="button" class="close">&times;</button><span class="group-object__name"><%= group.name %></span>')

	});

}(Backbone));