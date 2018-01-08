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
