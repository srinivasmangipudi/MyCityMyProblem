var problemsData = [
	{
		title: 'Introducing My City My Problems',
		url: 'http://sachagreif.com/introducing-telescope/'
	},
	{
		title: 'Meteor',
		url: 'http://meteor.com'
	},
	{
		title: 'The Meteor Book',
		url: 'http://themeteorbook.com'
	}
];
	
Template.problemsList.helpers({
	problems: problemsData
});