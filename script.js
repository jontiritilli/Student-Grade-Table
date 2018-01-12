/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
// $(document).ready(initializeApp);

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
// function initializeApp(){
// 	// addClickHandlersToElements();
// }

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
function addStudent(){
	var name = $('#studentName').val();
	var course = $('#course').val();
	var grade = $('#studentGrade').val();
	var endFunction = false;
	if(name.length === 0){
		$('#studentName').val('Name Required');
		endFunction = true;
	};
	if(course.length === 0){
		$('#course').val('Course Required');
		endFunction = true;
	};
	if(isNaN(parseInt(grade))){
		$('#studentGrade').val('Use Only Numbers');
		endFunction = true;
	};
	if(grade.length === 0){
		$('#studentGrade').val('Grade Required');
		endFunction = true;
	};
	if(parseInt(grade) < 0 || parseInt(grade) > 100){
		$('#studentGrade').val('Grade must be 0 - 100');
		endFunction = true;
	};
	if(endFunction===true){
		return;
	};
	// student_array.unshift({name: name, course: course, grade: grade})
	var student = {name: name, course: course, grade: grade}
	addData(student)
	// $('tBody').empty();
	// updateStudentList(student_array);
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
	var deleteBtn = $('<button>',{
		text: 'Delete',
		class:'btn btn-danger',
		on: {
			click: function(){
				removeStudent(student);
			}
		}
	});
	var newRow = $('<tr>').addClass(student);
	var newNameTH = $('<th>');
	var newCourseTH = $('<th>');
	var newGradeTH = $('<th>');
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
	for(var studentIndex = 0; studentIndex< array.length; studentIndex ++){
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
	var gradeList = array.map(function(obj) {
	  return parseInt(obj.grade);
	});
	var getSum = function(total,num){
		return total+num;
	}
	var number = gradeList.reduce(getSum)/gradeList.length;
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

// $(".student-add-form").validate({
// 	rules: {
// 		studentname: "required",
// 		course: "required",
// 		studentgrade: {
// 			required: true,
// 			number: true
// 		}
// 	}
// });

function getData(){
	var ajaxConfig = {
		dataType: 'json',
		data: {
			api_key: '4q6Xvdec30'
		},
		method: 'POST',
		url: 'http://s-apis.learningfuze.com/sgt/get',
		success: function(response){
			console.log(response)
			updateStudentList(response.data);
		}
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
			if (response['success'] === true){
				console.log(response);
				student.student_id = response.new_id;
				renderStudentOnDom(student);
			}
		},
		error: function(response){
			if(response['success'] === false){
				console.log(response);
				$('.error').text(response);
				$('.modal').fadeIn();
			}
		}
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
			if(response['success'] === true)
			console.log(response);
			student.displayRow.remove();
		},
		error: function(response){
			if(response['success'] === false){
				console.log(response);
				$('.error').text(response);
				$('.modal').fadeIn();
			}
		}
	}
	$.ajax(ajaxConfig)
}