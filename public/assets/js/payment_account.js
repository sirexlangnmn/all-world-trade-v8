function paymentAccount() {
    $.ajax({
        url: '/api/post/email-payment-account',
        type: 'POST',
        data: {
            email: sessionEmail,
        },
        success: function (data) {
            // some code here
        },
        error: function (e) {
            // some code here
        },
    });
}
