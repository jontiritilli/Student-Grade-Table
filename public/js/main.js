/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);
/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
	addClickHandlers();
	validateSignIn();
	validateSignUp();
	validateCourses();
	$.validator.methods.email = function (value, element) {
		return this.optional(element) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/.test(value);
	}
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlers(){
	$('#signUpBtn').on('click', () => {
		addTeacher();
	});

	$('#loginBtn').on('click', () => {
		loginUser();
	});

	$('#clearBtn').on('click', () => {
		clearForm(event)
	});
}

function clearForm(event){
	event.target.parentElement.parentElement.reset();
}

function loginUser() {
	console.log($('.signin-form').serialize())
	event.preventDefault();
	$.ajax({
		url: '/auth/signin',
		data: $('.signin-form').serialize(),
		method: 'post',
		success: res => {
			localStorage.setItem('token', res.token)
		},
		error: err => {
			console.log(err)
			// $('.modalHeader').text(err.statusMessage)
			// $('.modalText').text('There was an issue logging in')
			// $('.modal').show()
		}
	})
}

function addTeacher(){
	event.preventDefault();
	console.log($('.signup-form').serialize());
	$.ajax({
		url: '/auth/signup',
		data: $('.signup-form').serialize(),
		method: 'post',
		success: res => {
			console.log(res)
		},
		error: err => {
			console.log(err)
		}
	})
}


function addStudent(){
	event.preventDefault();
	console.log($('.student-add-form').serialize());
	$.ajax({
		url: '/auth/signup',
		data: $('.signup-form').serialize(),
		method: 'post',
		success: res => {
			console.log(res)
		},
		error: err => {
			console.log(err)
		}
	})
}

function renderStudentOnDom(student){
	let deleteBtn = $('<button>',{
		text: 'Delete',
		class:'btn btn-outline-danger',
		on: {
			click: function(){
				deleteData(student);
			}
		}
	});
	let newRow = $('<tr>', {
		class: 'student col-xs-12'
	});
	let newNameTH = $('<th>');
	let newCourseTH = $('<th>');
	let newGradeTH = $('<th>');
	let viewBtnTH = $('<th>');
	newRow.append(newNameTH.text(student.name));
	newRow.append(newCourseTH.text(student.course));
	newRow.append(newGradeTH.text(student.grade));
	newRow.append(viewBtnTH.append(deleteBtn));
	$('tbody').append(newRow);
}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */

function updateStudentList(array){
	$('#tBody').empty();
	for(let studentIndex = 0; studentIndex< array.length; studentIndex ++){
		(function () {
			renderStudentOnDom(array[studentIndex]);
		})();
		
	};
	calculateGradeAverage(array);
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(array){
	let gradeList = array.map( obj => obj.grade);
	let average = gradeList.reduce((total,num) => total+num, 0)/gradeList.length;
	renderGradeAverage(average);
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(average){
	$('.avgGrade').text(average.toFixed(1));
}

/***************************************************************************************************
 * validation - validates inputs
 */
function validateSignUp() {
	$(".signup-form").validate({
		rules: {
			firstName: {
				required: true,
				minlength: 2
			},
			lastName: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 8
			},
			confirmPassword: {
				required: true,
				minlength: 8,
				equalTo: '#password'
			}
		},
		//For custom messages
		messages: {
			firstName: {
				required: 'This Field is Required',
				minlength: 'Enter at least 2 characters'
			},
			lastName: {
				required: 'This Field is Required',
				minlength: 'Enter at least 2 characters'
			},
			email: {
				required: 'This Field is Required',
				email: 'Valid email required'
			},
			password: {
				required: 'This Field is Required',
				minlength: 'Password must be at least 8 characters'
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
				minlength: 8
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
				minlength: 'Password must be at least 8 characters'
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
			studentName: {
				required: true,
				minlength: 2
			},
			course: {
				required: true,
				minlength: 2
			},
			studentGrade: {
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

