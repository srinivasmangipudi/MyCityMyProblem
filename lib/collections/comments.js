Comments = new Meteor.Collection('comments');

Meteor.methods({
	commentInsert: function(commentAttributes) {
		check(this.userId, String);
		check(commentAttributes, {
			problemId: String,
			body: String
		});

		var user = Meteor.user();
		var problem = Problems.findOne(commentAttributes.problemId);

		if(!problem)
			throw new Meteor.Error('invalid-comment', 'You must comment on a post!');

		comment = _.extend(commentAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		//increment the comment count
		Problems.update(comment.problemId, {$inc: {commentsCount:1}});
		
		return Comments.insert(comment);
	}
});