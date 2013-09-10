(function ($, Backbone) {

	App.Users = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage("Users"),
		/**
		 * Create new user in list
		 * @param {Object} hash initial user data
		 * @returns {Object} promise for delayed operation
		 */
    createUser: function (hash) {
			var collection = this;
			return App.wrapInPromise(collection, collection.create, hash)
				.fail(function (model) {
					collection.remove(model);
				});
    }
	});

	App.UsersView = Backbone.View.extend({

    events: {
      "submit .js-new-user-form": "submitUserName"
    },

		initialize: function () {
      _.bindAll(this, "createUserView", "submitUserName");

			this.handleCollectionEvents();
			return this;
		},

    createUserView: function (model) {
      var panel = this.$el;
      var view = new App.UserView({
        model: model
      });
      panel.append(view.$el);
    },

		handleCollectionEvents: function () {
      var panelView = this;

			this.collection.on("add", function (model) {
        panelView.createUserView(model);
			});

			this.collection.on("remove", function (model) {
				model.destroy();
			});

			this.collection.on("reset", function (collection, options) {
        _.forEach(options.previousModels, function (model) {
          model.destroy();
        });
        collection.forEach(panelView.createUserView);
			});
		},

		submitUserName: function (e) {
      e.preventDefault();

      var $submit = this.$el.find(".js-new-user-form button");
      var $input = this.$el.find(".js-new-user-name");
      var name = $input.val();
      name = $.trim(name);

      if (name.length) {
        $input.add($submit).attr("disabled", true);
        this.collection
          .createUser({name: name})
          .always(function (model) {
            $input.val("").add($submit).attr("disabled", false);
          });
      }
    }


  });


}(jQuery, Backbone));