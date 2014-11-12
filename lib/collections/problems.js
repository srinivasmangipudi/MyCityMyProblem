Problems = new Mongo.Collection('problems');

Problems.allow({
	insert: function(userId, doc){
		//only allow submitting when user is logged in
		return !! userId;
	}
});