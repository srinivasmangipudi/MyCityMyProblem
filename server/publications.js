Meteor.publish('problems', function() {
	return Problems.find();
});

Meteor.publish('comments', function(problemId) {
	check(problemId, String);
	return Comments.find({problemId: problemId});
});