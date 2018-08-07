$(document).ready(initializeApp);

function initializeApp(){
  //initialize datatable plugin
	$('.student-table').DataTable({
		'paging': false,
		'info': false
  });
  //modal click handler for delete
	$('.delete').on('click', (event) => {
		$('.messageModal').show();
		$('.modal form').attr(
			{
				action: event.target.getAttribute('data'),
				method: event.target.getAttribute('data-method')
			}
		)
		$('.modal .studentName').text(event.target.getAttribute('name'));
  });

  //modal click handler for update
	$('.update').on('click', (e) => {
    let target = e.target;

    $('.updateModal').show();

    let data = JSON.parse(target.getAttribute('name'));

    let { _id, name, course, grade } = data;

    $('.update-student-form').attr('action', '/student/update/'+_id)

    $('.updateModal #name').val(name);

    $('.updateModal #course').val(course);

    $('.updateModal #grade').val(grade);
  });

  $(window).on('resize', function(){
    setTimeout(function(){
        let max_width = $('table').parent().width();
        console.log(max_width);
        $('table').css("width", max_width);
      }, 75)
  });
  window.addEventListener('orientationchange', function(){
    setTimeout(
      function tableSizing(){
        let max_width = $('table').parent().width();
        $('table').css("width", max_width);
      }, 100)
  });
  //modify table plugin to fill screen

  //initialize validation
	validateSignIn();
	validateSignUp();
	validateCourses();
	$.validator.methods.email = function (value, element) {
		return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(value);
	}
	$.validator.addMethod("whitespace", function(value, element){
		return this.optional(element) || /^\S+$/.test(value)
	}, "whitespace test");
    $.validator.addMethod("lettersOnly", function (value, element) {
      return this.optional(element) || /^([a-zA-Z0-9]+\s?[a-zA-Z0-9]*)$/.test(value)
	}, "Alpha only");
}

function validateSignUp() {
	$(".signup-form").validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				whitespace: true,
				email: true
			},
			password: {
				required: true,
				whitespace: true,
				minlength: 5
			},
			confirmPassword: {
				required: true,
				equalTo: '#password'
			}
		},
		//For custom messages
		messages: {
			name: {
				required: 'This Field is Required',
				minlength: 'Enter at least 2 characters'
			},
			email: {
				required: 'This Field is Required',
				whitespace: 'Spaces are not valid characters',
				email: 'Valid email required'
			},
			password: {
				required: 'This Field is Required',
				whitespace: 'Spaces are not valid characters',
				minlength: 'Password must be at least 5 characters'
			},
			confirmPassword: {
				required: 'This Field is Required',
				equalTo: 'Must match password entered above'
			}
		},
		errorElement: 'span',
		errorClass: 'label',
		errorPlacement: function (error, element) {
			if (element.parent('.input-group').length) {
				error.insertAfter(element.parent());
			} else {
				error.insertAfter(element);
			}
		}
	});
}

function validateSignIn() {
	$(".signin-form").validate({
		rules: {
			email: {
				required: true,
				whitespace: true,
				email: true
			},
			password: {
				required: true,
				whitespace: true,
				minlength: 5
			},
		},
		//For custom messages
		messages: {
			email: {
				required: 'This Field is Required',
				whitespace: 'Spaces are not valid characters',
				email: 'Valid email required'
			},
			password: {
				required: 'This Field is Required',
				whitespace: 'Spaces are not valid characters',
				minlength: 'Password must be at least 5 characters'
			},
		},
		errorElement: 'span',
		errorClass: 'label',
		errorPlacement: function (error, element) {
			if (element.parent('.input-group').length) {
				error.insertAfter(element.parent());
			} else {
				error.insertAfter(element);
			}
		}
	});
}

function validateCourses() {
	$(".student-add-form, .updateModal").validate({
		rules: {
			name: {
				required: true,
				maxlength: 20,
				lettersOnly: true,
				minlength: 2
			},
			course: {
				required: true,
				maxlength: 20,
				lettersOnly: true,
				minlength: 2
			},
			grade: {
				required: true,
				number: true,
				maxlength: 5,
				min: 0,
				max: 100
			}
		},
		//For custom messages
		messages: {
			name: {
				required: 'This field is required',
				maxlength: 'Maximum of 20 characters',
				lettersOnly: 'Invalid input',
				minlength: 'Enter at least 2 letters'
			},
			course: {
				required: 'This field is required',
				maxlength: 'Maximum of 20 characters',
				lettersOnly: 'Invalid input',
				minlength: 'Enter at least 2 letters'
			},
			grade: {
				required: 'This field is required',
				number: 'Enter only numbers',
				maxlength: 'Max decimals is two (99.99)',
				min: 'Enter a number between 0 - 100',
				max: 'Enter a number between 0 - 100'
			}
		},
		errorElement: 'span',
		errorClass: 'label',
		errorPlacement: (error, element) => {
			if (element.parent('.input-group').length) {
				error.insertAfter(element.parent());
			} else {
				error.insertAfter(element);
			}
		}
	});
}

