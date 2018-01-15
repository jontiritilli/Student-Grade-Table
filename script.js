/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.  
 */

/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
// student_array = [];
/***********************
 * counter - global variable to keep track of entries created
 * @type {number}
 */
// counter = 0;
/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
	getData()
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
// function addClickHandlersToElements(){
	// $('#table-body').on('click','button',function(){
	// 	var studentRow = $(this).closest('tr');
	// 	removeStudent(studentRow);
	// });
// }

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(){
	addStudent();
}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
	clearAddStudentFormInputs();
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function validateStudentInfo () {
	let newStudent = {
		name: $('#studentName').val(),
		course: $('#course').val(),
		grade: $('#studentGrade').val()
	}
	let endFunction = false;
	if(newStudent.name.length < 1){
		$('#studentName').parent().removeClass('has-success');
		$('#studentName').parent().addClass('has-error');
		endFunction = true;
	} else {
		$('#studentName').parent().removeClass('has-error');
		$('#studentName').parent().addClass('has-success');
	};
	if(newStudent.course.length < 1){
		$('#course').parent().removeClass('has-success');
		$('#course').parent().addClass('has-error');
		endFunction = true;
	} else {
		$('#course').parent().removeClass('has-error');
		$('#course').parent().addClass('has-success');
	};
	if(isNaN(parseInt(newStudent.grade)) || newStudent.grade.length === 0 || parseInt(newStudent.grade) < 0 || parseInt(newStudent.grade) > 100){
		$('#studentGrade').parent().removeClass('has-success');
		$('#studentGrade').parent().addClass('has-error');
		endFunction = true;
	} else {
		$('#studentGrade').parent().removeClass('has-error');
		$('#studentGrade').parent().addClass('has-success');
	};
	if(!endFunction){
		$('.addButton').attr('onclick','addStudent()')
	} else {
		$('.addButton').attr('onclick','failedInput()')
	}
} //function validateStudentinfo

function failedInput () {
	$('.modalHeader').text('Operation Failed');
	$('.modalText').text('information was missing');
	$('.modal').fadeIn();
} //function failedInput

function addStudent(){
	const student = {
		name: $('#studentName').val(),
		course: $('#course').val(),
		grade: $('#studentGrade').val()
	}
	addData(student);
	clearAddStudentFormInputs();
}
/***************************************************************************************************
 * removeStudent - removes a student object and recalculates the grade avearge based upon the revised student_array
 * @param {undefined} none
 * @return undefined
 */
function removeStudent(student){
	deleteData(student);
	// student_array.splice(studentIndex,1);
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */

function clearAddStudentFormInputs(){
var inputIds = [
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
	let deleteBtn = $('<button>',{
		text: 'Delete',
		class:'btn btn-danger',
		on: {
			click: function(){
				removeStudent(student);
			}
		}
	});
	let newRow = $('<tr>').addClass(student);
	let newNameTH = $('<th>');
	let newCourseTH = $('<th>');
	let newGradeTH = $('<th>');
	newNameTH.text(student.name);
	newCourseTH.text(student.course);
	newGradeTH.text(student.grade);
	newRow.append(newNameTH);
	newRow.append(newCourseTH);
	newRow.append(newGradeTH);
	newRow.append(deleteBtn);
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
	let gradeList = array.map(function(obj) {
	  return parseInt(obj.grade);
	});
	let getSum = function(total,num){
		return total+num;
	}
	let number = gradeList.reduce(getSum)/gradeList.length;
	renderGradeAverage(number);
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(average){
	$('.avgGrade').text(average.toFixed(1));
}

function getData(){
	var ajaxConfig = {
		dataType: 'json',
		data: {
			api_key: '4q6Xvdec30',
		},
		method: 'POST',
		url: 'http://s-apis.learningfuze.com/sgt/get',
		success: function(response){
			if(response.success === true){
				updateStudentList(response.data);
			} else {
				$('.modalHeader').text('Operation Failed');
				$('.modalText').text(response.errors);
				$('.modal').fadeIn();
			}
		},
		error: function(response){
			if (!response.success){
				$('.modalHeader').text('Error!');
				$('.modalText').text(response.statusText);
				$('.modal').fadeIn();
			}
		},
		timeout: 5000
	}
	$.ajax(ajaxConfig)
}

function addData(student){
	var ajaxConfig = {
		dataType: 'json',
		data: {
			api_key: '4q6Xvdec30',
			name: student.name,
			course: student.course,
			grade: student.grade
		},
		method: 'POST',
		url: 'http://s-apis.learningfuze.com/sgt/create',
		success: function(response){
			if (response.success){
				student.id = response.new_id;
				renderStudentOnDom(student);
				$('.modalHeader').text('Success');
				$('.modalText').text('Student was added to the database');
				$('.modal').fadeIn();
			} else {
				$('.modalHeader').text('Operation Failed');
				$('.modalText').text(response.errors);
				$('.modal').fadeIn();
			}
		},
		error: function(response){
			if (!response.success){
				$('.modalHeader').text('Error!');
				$('.modalText').text(response.statusText);
				$('.modal').fadeIn();
			}
		},
		timeout: 5000
	}
	$.ajax(ajaxConfig)
}

function deleteData(student){
	var ajaxConfig = {
		dataType: 'json',
		data: {
			api_key: '4q6Xvdec30',
			student_id: student.id
		},
		method: 'POST',
		url: 'http://s-apis.learningfuze.com/sgt/delete',
		success: function(response){
			if(response.success){
				student.displayRow.remove();
				$('.modalHeader').text('Success');
				$('.modalText').text('Student was deleted from the database');
				$('.modal').fadeIn();
			} else {
				$('.modalHeader').text('Operation Failed');
				$('.modalText').text(response.errors);
				$('.modal').fadeIn();
			}
		},
		error: function(response){
			if (!response.success){
				$('.modalHeader').text('Error!');
				$('.modalText').text(response.statusText);
				$('.modal').fadeIn();
			}
		},
		timeout: 5000
	}
	$.ajax(ajaxConfig)
}