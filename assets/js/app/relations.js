(function (Backbone) {

	App.UserGroupRelation = Backbone.Model.extend({});

	App.UserGroupRelations = Backbone.Collection.extend({
		model: App.UserGroupRelation,
		localStorage: new Backbone.LocalStorage("UserGroupRelations"),

		setUsersAndGroups: function (users, groups) {
			this.users = users;
			this.groups = groups;
		},

		addUserToGroup: function (user, group) {
			var rels = this.findRelations(user, group);

			if (!rels.length) {
				this.create({
					userId: user.id,
					groupId: group.id
				}, {
					wait: true
				});
			}
		},

		removeUserFromGroup: function (user, group) {
			var rels = this.findRelations(user, group);

			if (rels.length) {
				this.remove(rels);
			}
		},

		findRelations: function (user, group) {
			return this.filter(function (rel) {
				return rel.userId == user.id && rel.groupId == group.id;
			});
		},

		findUsersInGroup: function (group) {
			var rels = this.filter(function () {
				return this.groupId == group.id;
			});

			return this.users.filter(function (user) {
				return _.some(rels, function (rel) {
					return rel.userId == user.id;
				});
			});
		},

		findGroupsForUser: function (user) {
			var rels = this.filter(function () {
				return this.userId == user.id;
			});

			return this.groups.filter(function (user) {
				return _.some(rels, function (rel) {
					return rel.groupId == group.id;
				});
			});
		}

	});

}(Backbone));