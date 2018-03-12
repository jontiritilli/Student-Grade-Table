export function validate() {
    $(".teacher_add_form").validate({
        rules: {
            firstName: {
                required: 'Please provide first name',
                minlength: 5
            },
            lastName: {
                required: 'Please provide last name',
                minlength: 5
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
        //For custom messages
        messages: {
            firstName: {
                required: true,
                minlength: 5
            },
            lastName: {
                required: true,
                minlength: 5
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