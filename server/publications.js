Meteor.publish('problems', function() {
	return Problems.find();
});

Meteor.publish('comments', function(problemId) {
	check(problemId, String);
	return Comments.find({problemId: problemId});
});

Meteor.publish('notifications', function() {
	return Notifications.find({userId: this.userId});
});