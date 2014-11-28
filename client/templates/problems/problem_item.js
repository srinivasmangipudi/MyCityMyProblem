Template.problemItem.helpers({
	ownProblem: function() {
		return this.userId === Meteor.userId();
	},

	domain: function() {
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	},

	upvotedClass: function() {
		var userId = Meteor.userId();
		if(userId && !_.include(this.upvoters, userId)) {
			return 'upvotable';
		} else if (!userId) {
			return 'disabled';
		} else {
			return 'btn-success disabled';
		}
	}
});

Template.problemItem.events({
	'click .upvotable': function(e) {
		e.preventDefault();
		Meteor.call('upvote', this._id);
	}
});