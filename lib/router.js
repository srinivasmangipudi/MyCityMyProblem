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
	subscriptions: function() {
		this.problemsSub = Meteor.subscribe('problems', this.findOptions());
	},
	problems: function() {
		return Problems.find({}, this.findOptions());
	},
	data: function() {
		var hasMore = this.problems().count() === this.problemsLimit();
		var nextPath = this.route.path({problemsLimit: this.problemsLimit() + this.increment});
		return {
			problems: this.problems(),
			ready: this.problemsSub.ready,
			nextPath: hasMore ? nextPath : null
		};
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