Problems = new Mongo.Collection('problems');


Meteor.methods({
	problemInsert: function(problemAttributes) {
		check(Meteor.userId(), String);
		check(problemAttributes, {
			title: String,
			url: String
		});

		var problemWithSameLink = Problems.findOne({url:problemAttributes.url});
		if(problemWithSameLink) {
			return {
				problemExists: true,
				_id: problemWithSameLink._id
			}
		}

		var user = Meteor.user();
		var problem = _.extend(problemAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		var problemId = Problems.insert(problem);

		return {
			_id: problemId
		};
	}
});