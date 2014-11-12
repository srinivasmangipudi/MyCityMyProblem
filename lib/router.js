Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('problems');}
});

Router.route('/', {name: 'problemsList'});

Router.route('/posts/:_id', {
	name: 'problemPage',
	data: function () { return Problems.findOne(this.params._id); }
});

Router.route('/submit', {name: 'problemSubmit'});

Router.onBeforeAction('dataNotFound', {only: 'problemPage'});