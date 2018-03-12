export function validateSignIn() {
    $(".signin_form").validate({
        rules: {
            email: {
                required: 'Please provide an email',
                email: 'Valid email required'
            },
            password: {
                required: 'Please choose a password',
                minlength: 'Password must be at least 8 characters'
            }
        },
        //For custom messages
        messages: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8
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