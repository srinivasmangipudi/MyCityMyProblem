Template.problemItem.helpers({
	ownProblem: function() {
		return this.userId === Meteor.userId();
	},

	domain: function() {
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	},

	commentsCount: function() {
		return Comments.find({problemId: this._id}).count();
	}
});