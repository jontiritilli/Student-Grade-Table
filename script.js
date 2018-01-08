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
student_array = [];
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
counter = 0;
/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
	addClickHandlersToElements();
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){
	$('#table-body').on('click','button',function(){
		var studentRow = $(this).closest('tr');
		removeStudent(studentRow);
	});
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(event){
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
	var studentName = $('#studentName').val();
	var studentCourse = $('#course').val();
	var studentGrade = $('#studentGrade').val();
	var currentID = counter;
	student_array.push({name: studentName, course: studentCourse, grade: studentGrade, id: counter})
	updateStudentList(student_array);
	clearAddStudentFormInputs();
	counter++;
}
/***************************************************************************************************
 * removeStudent - removes a student object and recalculates the grade avearge based upon the revised student_array
 * @param {undefined} none
 * @return undefined
 */
function removeStudent(student){
	var id = function(){
		var arrayPositions = student_array.map(function(obj) {
		  return parseInt(obj.id);
		});
		var num = parseInt(student.attr('num'));
		for(var arrayPosIndex = 0; arrayPosIndex < arrayPositions.length; arrayPosIndex++){
			if(arrayPositions[arrayPosIndex] === num){
				return arrayPosIndex;
			}
		}
	}();
	student.remove();
	student_array.splice(id,1);
	if(student_array.length>0){
		var averageGrade = calculateGradeAverage(student_array); //new average
		renderGradeAverage(averageGrade);
	} else {
		renderGradeAverage(0);
	}

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
function renderStudentOnDom(studentObj){
	var btnDelete = "<button class='btn btn-danger'>Delete</button>";
	var newRow = '<tr num='+counter+'><th>'+studentObj.name+'</th><th>'+studentObj.course+'</th><th>'+studentObj.grade+'</th><th>'+btnDelete+'</th></tr>';
	$('tbody').append(newRow);
}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(array){
	renderStudentOnDom(array[array.length-1]);
	var averageGrade = calculateGradeAverage(student_array);
	renderGradeAverage(averageGrade);
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
	var number = gradeList.reduce(getSum)/gradeList.length
	return number;
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(average){
	$('.avgGrade').text(average);
}

$(".student-add-form").validate({
	rules: {
		studentname: "required",
		course: "required",
		studentgrade: {
			required: true,
			number: true
		}
	}
});