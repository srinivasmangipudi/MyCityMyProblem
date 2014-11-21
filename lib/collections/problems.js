Problems = new Mongo.Collection('problems');

Problems.allow({
	update: function(userId, problem) { return ownsDocument(userId, problem); },
	remove: function(userId, problem) { return ownsDocument(userId, problem); },
});

Problems.deny({
	update: function(userId, problem, fieldNames) {
		//may only edit the following fields
		return (_.without(fieldNames, 'url', 'title', 'message').length > 0);
	}
});

Meteor.methods({
	problemInsert: function(problemAttributes) {
		check(Meteor.userId(), String);
		check(problemAttributes, {
			title: String,
			url: String,
			message: String
		});

		/*if(Meteor.isServer) {
			problemAttributes.title += "(server)";
			//wait for 5 secs
			Meteor._sleepForMs(5000);
		} else {
			problemAttributes.title += "(client)";
		}*/

		var problemWithSameLink = Problems.findOne({url:problemAttributes.url});
		if(problemWithSameLink) {
			//throw new Meteor.Error(302, "This link has already been posted! Please discuss it.");
			return {
				problemExists: true,
				_id: problemWithSameLink._id
			}
		}

		var user = Meteor.user();
		if(!user)
			throw new Meteor.Error(401, "You need to log in to post new problems!");

		var problem = _.extend(problemAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date(),
			commentsCount: 0
		});

		var problemId = Problems.insert(problem);

		return {
			_id: problemId
		};
	}
});