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

Router.route('/posts/:_id/edit', {
	name: 'problemEdit',
	data: function () { return Problems.findOne(this.params._id); }
});

Router.route('/submit', {name: 'problemSubmit'});

var requireLogin = function() {
	if (!Meteor.user()){
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
};

Router.onBeforeAction(requireLogin, {only: 'problemSubmit'});
Router.onBeforeAction('dataNotFound', {only: 'problemPage'});