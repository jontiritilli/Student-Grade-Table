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

	$('#resetBtn').on('click', () => {
		clearForm(event)
	});
}

function loginUser() {
	console.log($('.signin-form').serialize())
	event.preventDefault();
	$.ajax({
		url: '/signin',
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
		url: '/signup',
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
/***************************************************************************************************
 * removeStudent - removes a student object and recalculates the grade avearge based upon the revised student_array
 * @param {undefined} none
 * @return undefined
 */
function removeStudent(student){
	deleteData(student);
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */

function clearAddStudentFormInputs(){
let inputIds = [
	$('#studentName').val(''),
	$('#course').val(''),
	$('#studentGrade').val('')
];
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(student){
	let viewBtn = $('<button>',{
		text: 'Courses',
		class:'btn btn-outline-success',
		on: {
			click: function(){
				viewCourses(student);
			}
		}
	});
	let newRow = $('<tr>', {
		class: 'student col-12'
	});
	let newNameTH = $('<th>');
	let newCourseTH = $('<th>');
	let newGradeTH = $('<th>');
	let viewBtnTH = $('<th>');
	newNameTH.text(student.name);
	newCourseTH.text(student.course);
	newGradeTH.text(student.grade);
	newRow.append(newNameTH);
	newRow.append(newCourseTH);
	newRow.append(newGradeTH);
	newRow.append(viewBtnTH.append(viewBtn));
	student.displayRow = newRow;
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
				required: 'Please provide first name',
			},
			lastName: {
				required: 'Please provide last name',
			},
			email: {
				required: 'Please provide an email',
				email: 'Valid email required'
			},
			password: {
				required: 'Please choose a password',
				minlength: 'Password must be at least 8 characters'
			},
			confirmPassword: {
				required: 'Please confirm your password',
				equalTo: 'Must match password entered above'
			}
		},
		errorElement: 'div',
		errorPlacement: function (error, element) {
			var placement = $(element).data('error');
			if (placement) {
				$(placement).append(error)
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
		errorElement: 'div',
		errorPlacement: function (error, element) {
			var placement = $(element).data('error');
			if (placement) {
				$(placement).append(error)
			} else {
				error.insertAfter(element);
			}
		}
	});
}
