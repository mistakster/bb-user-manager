(function (Backbone) {

	App.Group = Backbone.Model.extend({

		setSelected: function (val) {
			var modified = !this.selected !== !val;
			this.selected = val;
			if (modified) {
				this.trigger("selected", this, this.selected);
			}
		},

		toggleSelected: function () {
			this.selected = !this.selected;
			this.trigger("selected", this, this.selected);
		}

	});

	App.GroupView = Backbone.View.extend({

		tagName: "div",
		className: "list-group-item group-object",

		events: {
			"click": function (e) {
				this.model.toggleSelected();
			},

			"click .close": function (e) {
				e.stopPropagation();
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
			this.listenTo(this.model, "selected", this.render);

			this.render();

			return this;
		},

		render: function () {
			this.$el.attr("id", "group-" + this.model.id)
				.toggleClass("active", !!this.model.selected)
				.html(App.GroupView.template({group: this.model.toJSON()}));
			return this;
		}

	}, {

		template: _.template('<button type="button" class="close">&times;</button><span class="group-object__name"><%= group.name %></span>')

	});

}(Backbone));