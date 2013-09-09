(function ($, Backbone) {

	App.Users = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage("Users")
	});

	App.UsersView = Backbone.View.extend({

    events: {
      "submit .js-new-user-form": "createNewUser"
    },

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
		},

    createNewUser: function (e) {
      e.preventDefault();

      var $submit = this.$el.find(".js-new-user-form button");
      var $input = this.$el.find(".js-new-user-name");
      var name = $input.val();
      name = $.trim(name);

      if (name) {
        this.collection.create({name: name}, {
          wait: true,
          success: function () {
            $input.val("").add($submit).attr("disabled", false);
          }
        });

        $input.add($submit).attr("disabled", true);
      }
    }


  });


}(jQuery, Backbone));