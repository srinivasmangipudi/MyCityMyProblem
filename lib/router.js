Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	'clearErrors': function(page) {
		Errors.clearSeen();
		return page;
	},
	waitOn: function() {
		return [Meteor.subscribe('problems'), Meteor.subscribe('notifications')];
	}
});

Router.route('/', {name: 'problemsList'});

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