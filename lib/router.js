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
	name: 'problemsList',
	waitOn: function() {
		var limit = parseInt(this.params.problemsLimit) || 5;
		return Meteor.subscribe('problems', {sort: {submitted: -1}, limit:limit});
	},
	data: function() {
		var limit = parseInt(this.params.problemsLimit) || 5;
		return {
			problems : Problems.find({}, {sort: {submitted: -1}, limit: limit})
		};
	}
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