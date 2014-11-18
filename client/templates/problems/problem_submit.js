Template.problemSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var problem = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		};

		Meteor.call('problemInsert', problem, function(error, result)
		{
			/*//display error to user and abort
			if(error)
				return alert(error.reason);

			//if problem.url exists then show the result and route it 
			if(result.problemExists)
				alert('This link has already been posted');

			Router.go('problemPage', {_id:result._id});*/

			if(result.problemExists)
			{
				throwError("This link has already been posted! Please discuss it.");
			}
				

			if(error)
			{
				//display the error to the user
				throwError(error.reason);

				if(error.error === 302)
					Router.go('problemPage', {_id: error.details});
			} else
			{
				Router.go('problemPage', {_id: result._id});
			}
		});
	}
});