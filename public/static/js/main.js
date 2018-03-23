$(document).ready(initializeApp);

function initializeApp(){
	$('.student-table').DataTable();
	$('table').css("width",'100%')
	validateSignIn();
	validateSignUp();
	validateCourses();
	$.validator.methods.email = function (value, element) {
		return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(value);
	}
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
				email: true
			},
			password: {
				required: true,
				minlength: 5
			},
			confirmPassword: {
				required: true,
				minlength: 5,
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
				email: 'Valid email required'
			},
			password: {
				required: 'This Field is Required',
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
				email: true
			},
			password: {
				required: true,
				minlength: 5
			}
		},
		//For custom messages
		messages: {
			email: {
				required: 'Please provide an email',
				email: 'Valid email required'
			},
			password: {
				required: 'Please choose a password',
				minlength: 'Password must be at least 5 characters'
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

function validateCourses() {
	$(".student-add-form").validate({
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			course: {
				required: true,
				minlength: 2
			},
			grade: {
				required: true,
				min: 0,
				max: 100
			}
		},
		//For custom messages
		messages: {
			studentName: {
				required: 'This field is required',
				minlength: 'Please enter at least 2 letters'
			},
			course: {
				required: 'This field is required',
				minlength: 'Please enter at least 2 letters'
			},
			studentGrade: {
				required: 'This field is required',
				min: 'Please enter a number 0 - 100',
				max: 'Please enter a number 0 - 100'
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

