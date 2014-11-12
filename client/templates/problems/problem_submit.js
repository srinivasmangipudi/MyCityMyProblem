Template.problemSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var problem = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};

		problem._id = Problems.insert(problem);
		Router.go('problemPage', problem);
	}
});