Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	'clearErrors': function(page) {
		Errors.clearSeen();
		return page;
	},
	waitOn: function() {
		return [Meteor.subscribe('notifications')];
	}
});

ProblemsListController = RouteController.extend({
	template: 'problemsList',
	increment: 5,
	problemsLimit: function() {
		return parseInt(this.params.problemsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: {submitted: -1}, limit: this.problemsLimit()};
	},
	waitOn: function() {
		return Meteor.subscribe('problems', this.findOptions());
	},
	data: function() {
		return {problems: Problems.find({}, this.findOptions())};
	}
});

Router.route('/problems/:_id', {
	name: 'problemPage',
	waitOn: function() {
		return Meteor.subscribe('comments', this.params._id);
	},
	data: function () { return Problems.findOne(this.params._id); }
});

Router.route('/problems/:_id/edit', {
	name: 'problemEdit',
	data: function () { return Problems.findOne(this.params._id); }
});

Router.route('/submit', {name: 'problemSubmit'});

Router.route('/:problemsLimit?', {
	name: 'problemsList'
});

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

/*Router.onBeforeAction(function() {
 clearErrors();
 this.next();
});*/