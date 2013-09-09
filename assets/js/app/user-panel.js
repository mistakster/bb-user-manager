(function ($, Backbone) {

	App.Users = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage("Users"),
    createNewUser: function (hash) {
      var collection = this;
      var dfd = $.Deferred(), promise = dfd.promise();
      var model = this.create(hash, {
        wait: true,
        success: function () {
          dfd.resolveWith(promise, [model]);
        },
        error: function () {
          collection.remove(model);
          dfd.rejectWith(promise, [model]);
        }
      });
      return promise;
    }
	});

	App.UsersView = Backbone.View.extend({

    events: {
      "submit .js-new-user-form": "createNewUser"
    },

		initialize: function () {
      _.bindAll(this, "createUserView");

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

    createNewUser: function (e) {
      e.preventDefault();

      var $submit = this.$el.find(".js-new-user-form button");
      var $input = this.$el.find(".js-new-user-name");
      var name = $input.val();
      name = $.trim(name);

      if (name.length) {
        $input.add($submit).attr("disabled", true);
        this.collection
          .createNewUser({name: name})
          .always(function (model) {
            $input.val("").add($submit).attr("disabled", false);
          });
      }
    }


  });


}(jQuery, Backbone));