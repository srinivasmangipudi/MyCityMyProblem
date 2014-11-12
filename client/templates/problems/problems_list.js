Template.problemsList.helpers({
	problems: function(){
		return Problems.find({}, {sort: {submitted: -1}});
	}
});