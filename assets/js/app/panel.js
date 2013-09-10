(function ($, Backbone) {

	App.Panel = Backbone.Collection.extend({
		/**
		 * Create new item in list
		 * @param {Object} hash initial item data
		 * @returns {Object} promise for delayed operation
		 */
		createItem: function (hash) {
			var collection = this;
			return App.wrapInPromise(collection, collection.create, hash)
				.fail(function (model) {
					collection.remove(model);
				});
		}
	});

	App.PanelView = Backbone.View.extend({

		events: {
			"submit .js-new-item-form": "submitItemName"
		},

		initialize: function () {
			_.bindAll(this, "createItemView", "submitItemName");

			this.handleCollectionEvents();
			return this;
		},

		createItemView: function (model) {
			var panel = this.$el;
			var constructor = this.itemView;
			new constructor({model: model}).$el.appendTo(panel);
		},

		handleCollectionEvents: function () {
			var panelView = this;

			this.collection.on("add", function (model) {
				panelView.createItemView(model);
			});

			this.collection.on("remove", function (model) {
				model.destroy();
			});

			this.collection.on("reset", function (collection, options) {
				_.forEach(options.previousModels, function (model) {
					model.destroy();
				});
				collection.forEach(panelView.createItemView);
			});
		},

		submitItemName: function (e) {
			e.preventDefault();

			var $form = this.$el.find(".js-new-item-form");
			var $submit = $form.find("button");
			var $input = $form.find("input");
			var name = $input.val();
			name = $.trim(name);

			if (name.length) {
				$input.add($submit).attr("disabled", true);
				this.collection
					.createItem({name: name})
					.always(function (model) {
						$input.val("").add($submit).attr("disabled", false);
					});
			}
		}

	});

}(jQuery, Backbone));