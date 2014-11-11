Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('problems');}
});

Router.route('/', {name: 'problemsList'});
Router.route('/posts/:_id', {
	name: 'problemPage',
	data: function () { return Problems.findOne(this.params._id); }
});