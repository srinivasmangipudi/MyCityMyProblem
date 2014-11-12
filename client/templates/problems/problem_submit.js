Template.problemSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var problem = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};

		Meteor.call('problemInsert', problem, function(error, result) {
			//display error to user and abort
			if(error)
				return alert(error.reason);

			//if problem.url exists then show the result and route it 
			if(result.problemExists)
				alert('This link has already been posted');

			Router.go('problemPage', {_id:result._id});
		});		
	}
});