Meteor.publish('problems', function() {
	return Problems.find();
});

Meteor.publish('comments', function() {
	return Comments.find();
});